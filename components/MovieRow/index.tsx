import { useRef, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Movie } from '../../typings'
import Thumbnail from '../Thumbnail'

interface Props {
  title: string
  movies: Movie[]
}

const MovieRow = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const chevronLeftClass = [`movie-row-icon left-2 ${!isMoved ? 'hidden' : ''}`]
    .join(' ')
    .trim()

  const handleClick = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <section className="group relative md:-ml-2">
        <HiOutlineChevronLeft
          className={chevronLeftClass}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie: Movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <HiOutlineChevronRight
          className="movie-row-icon right-2"
          onClick={() => handleClick('right')}
        />
      </section>
    </div>
  )
}

export default MovieRow
