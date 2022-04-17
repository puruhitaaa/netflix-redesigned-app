import Image from 'next/image'
import React from 'react'
import useModal from '../../hooks/useModal'
import { Movie } from '../../typings'

interface Props {
  // movie: Movie | DocumentData;
  movie: Movie
}

const Thumbnail = ({ movie }: Props) => {
  const { toggleModalShow, setCurrentMovie } = useModal()

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        toggleModalShow()
        setCurrentMovie(movie)
      }}
    >
      <Image
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
      />
    </div>
  )
}

export default Thumbnail
