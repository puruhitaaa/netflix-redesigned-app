import { DocumentData } from 'firebase/firestore'
import { createContext, useContext, useMemo, useState } from 'react'
import { Movie } from '../typings'

interface IModal {
  show: boolean
  movie: Movie | DocumentData | null
  setCurrentMovie: (movie: Movie | null) => void
  toggleModalShow: () => void
  toggleModalHide: () => void
}

const ModalContext = createContext<IModal>({
  show: false,
  movie: null,
  setCurrentMovie: () => {},
  toggleModalShow: () => {},
  toggleModalHide: () => {},
})

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [show, setShow] = useState(false)
  const [movie, setMovie] = useState<Movie | DocumentData | null>(null)

  const setCurrentMovie = (movie: Movie | null) => setMovie(movie)
  const toggleModalShow = () => setShow(true)
  const toggleModalHide = () => setShow(false)

  const memoedValue = useMemo(
    () => ({ show, toggleModalShow, toggleModalHide, setCurrentMovie, movie }),
    [show, toggleModalShow, toggleModalHide, setCurrentMovie, movie]
  )
  return (
    <ModalContext.Provider value={memoedValue}>
      {children}
    </ModalContext.Provider>
  )
}

export default function useModal() {
  return useContext(ModalContext)
}
