import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import stylesNavBar from './styles.module.scss'
import { ReactComponent as FavoriteIcon } from '../../UI/icons/ic-favorites.svg'
import { ReactComponent as BasketIcon } from '../../UI/icons/ic-basket.svg'
import { Modal } from '../../Modal/Index'
import { Auth } from '../../forms/Auth'
import { useLogOut } from '../../../hooks/useLogOut'

export function NavBar() {
  const { items } = useSelector((store) => store.cart)
  const productFavoriteIds = useSelector((store) => store.favorite)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { logOut } = useLogOut()
  const { user } = useSelector((store) => store.user)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  if (Object.entries(user).length) {
    return (
      <ul className={`${stylesNavBar.navbar} flex`}>
        <li className="p-15 tooltip tooltip-bottom" data-tip="Created a new product">
          <Link to="/create_product" className="btn btn-ghost btn-circle">
            <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </Link>
        </li>
        <li className={`${!productFavoriteIds.length && 'tooltip tooltip-bottom'}`} data-tip="The favorites list is empty">
          <Link to="/favorites" className={`btn btn-ghost btn-circle ${!productFavoriteIds.length && 'pointer-events-none opacity-40'}`}>
            <div className="indicator">
              <FavoriteIcon />
              {productFavoriteIds.length > 0 && <span className="badge badge-sm indicator-item">{productFavoriteIds.length}</span>}
            </div>
          </Link>
        </li>
        <li className={`${!items.length && 'tooltip tooltip-bottom'}`} data-tip="The cart list is empty">
          <Link to="/cart" className={`btn btn-ghost btn-circle ${!items.length && 'pointer-events-none opacity-40'}`}>
            <div className="indicator">
              <BasketIcon />
              {items.length > 0 && <span className="badge badge-sm indicator-item">{items.length}</span>}
            </div>
          </Link>
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
