import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import stylesNavBar from './styles.module.scss'
import { ReactComponent as FavoriteIcon } from '../../UI/icons/ic-favorites.svg'
import { ReactComponent as BasketIcon } from '../../UI/icons/ic-basket.svg'
import { Modal } from '../../Modal/Index'
import { Auth } from '../../forms/Auth'
import { removeUser } from '../../../redux/slices/userSlice/userSlice'
import { clearSort } from '../../../redux/slices/sortProductsSlice/sortProductsSlice'
import { clearSearch } from '../../../redux/slices/searchProductsSlice/searchProductsSlice'
import { clearItems } from '../../../redux/slices/cartSlice/cartSlice'

export function NavBar() {
  const { items } = useSelector((store) => store.cart)
  const productFavoriteIds = useSelector((store) => store.favorite)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  const { user } = useSelector((store) => store.user)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const logOut = () => {
    dispatch(removeUser())
    dispatch(clearSort())
    dispatch(clearSearch())
    dispatch(clearItems())
  }
  if (Object.entries(user).length) {
    return (
      <ul className={`${stylesNavBar.navbar} flex`}>
        <li className={`p-15 ${!productFavoriteIds.length && 'tooltip tooltip-bottom'}`} data-tip="The favorites list is empty">
          {/* <div className="tooltip" data-tip="Select All"> */}
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
              {/* <span className="badge badge-sm indicator-item">{items.length}</span> */}
            </div>
          </Link>
          {/* <div className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">
                {items.length}
                {' '}
                Items
              </span>
              <span className="text-info">
                Subtotal:
                {' '}
                ₽
              </span>
              <Link to="/cart" className="btn btn-primary btn-block">
                View cart
              </Link>
            </div>
          </div> */}
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
