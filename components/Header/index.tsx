import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiBell, HiSearch } from 'react-icons/hi'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const headerStyling = isScrolled ? ['bg-[#141414]'].join('') : ''

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={headerStyling}>
      <section className="flex items-center space-x-2 md:space-x-10">
        <img
          className="cursor-pointer object-contain"
          width={100}
          height={100}
          src="https://rb.gy/ulxxee"
          alt="netflix-branding"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="header-link">Home</li>
          <li className="header-link">TV Shows</li>
          <li className="header-link">Movies</li>
          <li className="header-link">New & Popular</li>
          <li className="header-link">My List</li>
        </ul>
      </section>

      <section className="flex items-center space-x-4 text-sm font-light">
        <HiSearch size={24} className="hidden sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell size={24} />
        <Link href="/account">
          <img
            className="cursor-pointer rounded"
            src="https://rb.gy/g1pwyx"
            alt="netflix-avatar"
          />
        </Link>
      </section>
    </header>
  )
}

export default Header
