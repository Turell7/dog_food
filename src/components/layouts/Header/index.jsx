import { useLocation } from 'react-router-dom'
import { Logo } from '../../Logo'
import { NavBar } from '../NavBar'
import { Search } from '../Search'

export function Header() {
  const location = useLocation()

  return (
    <header className="bg-secondary p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          {location.pathname === '/' && <Search />}
          <NavBar />
        </div>
      </div>
    </header>
  )
}
