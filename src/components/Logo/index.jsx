import { Link } from 'react-router-dom'
import logo from './logo.svg'

export function Logo() {
  return (
    <Link className="flex items-center w-20 h-20 whitespace-nowrap" to="/">
      <img className="mr-2 align-middle" src={logo} alt="Dog Food" />
      <strong className="mr-2 align-middle text-2xl">Dog Food</strong>
    </Link>
  )
}
