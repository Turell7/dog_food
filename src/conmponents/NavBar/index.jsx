import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import stylesNavBar from './styles.module.scss'
import { ReactComponent as FavoriteIcon } from './img/ic-favorites.svg'
import { ReactComponent as BasketIcon } from './img/ic-basket.svg'
import { Modal } from '../Modal/Index'
import { useAuth } from '../../hook/useAuth'
import { Auth } from '../forms/Auth'

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, logOut } = useAuth()

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  if (user) {
    return (
      <ul className={`${stylesNavBar.navbar} flex`}>
        <li className="p-15">
          <Link to="/" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FavoriteIcon />
              <span className="badge badge-sm indicator-item">5</span>
            </div>
          </Link>
        </li>

        <li className="dropdown dropdown-end">
          <Link to="/" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <BasketIcon />
              <span className="badge badge-sm indicator-item">3</span>
            </div>
          </Link>
          <div className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: 999₽</span>
              <div className="card-actions">
                <button type="button" className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </li>

        <li className="dropdown dropdown-end">
          <button type="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 mask mask-squircle">
              <img src={user.avatar} alt="avatar" />
            </div>
          </button>
          <ul className="menu menu-compact
 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                {user.name}
                <span className="badge badge-secondary">Profile</span>
              </Link>
            </li>
            <li>
              <button onClick={logOut} type="button" className="justify-between">
                Log out
              </button>
            </li>

          </ul>
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <button onClick={openModal} type="button" className="btn btn-secondary shadow">
        LogIn
      </button>
      <Modal closeHandler={closeModal} isOpen={isModalOpen}>
        <Auth submitAdditionAction={closeModal} />
      </Modal>
    </ul>
  )
}