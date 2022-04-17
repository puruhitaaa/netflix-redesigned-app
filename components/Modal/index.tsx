import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { HiPlus, HiThumbUp, HiVolumeOff, HiVolumeUp, HiX } from 'react-icons/hi'
import ReactPlayer from 'react-player/lazy'
import useModal from '../../hooks/useModal'
import { Element, Genre } from '../../typings'

const Modal = () => {
  const { show, movie, toggleModalHide } = useModal()
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>()
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data?.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data?.genres)
      }
    }

    fetchMovie()
  }, [movie])

  return (
    <MuiModal
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      open={show}
      onClose={toggleModalHide}
    >
      <>
        <button
          onClick={toggleModalHide}
          className="modal-btn hover:[#181818] absolute right-5 top-5 !z-40 !border-none bg-[#181818]"
        >
          <HiX className="h-6 w-6" />
        </button>

        <section className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 10, left: 0 }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-0 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modal-btn">
                <HiPlus className="h-7 w-7" />
              </button>

              <button className="modal-btn">
                <HiThumbUp className="h-7 w-7" />
              </button>
            </div>

            <button className="modal-btn" onClick={() => setMuted(!muted)}>
              {muted ? (
                <HiVolumeOff className="h-6 w-6" />
              ) : (
                <HiVolumeUp className="h-6 w-6" />
              )}
            </button>
          </div>
        </section>

        <section className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </MuiModal>
  )
}

export default Modal
