/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice/cartSlice'
import { getDiscountedPrice, getProductRate } from '../../tools/helpers'
import { StarsRating } from '../UI/StarsRating'
import { ReactComponent as LikeIcon } from '../UI/icons/ic-like.svg'
import { useFavorite } from '../../hooks/useFavorite'
import { useLike } from '../../hooks/useLike'

export function Product({
  id, createdAt, name, img, price, tags, stock, discount, product,
}) {
  const dispatch = useDispatch()
  const discuontPrice = getDiscountedPrice(price, discount)
  const starSize = '32px'
  const { items } = useSelector((store) => store.cart)
  const cartItem = items.find((item) => item.id === id)

  const {
    isLiked,
    likeHandler,
  } = useLike(product)

  const {
    isFavorite,
    favoriteHandler,
  } = useFavorite(product._id)

  const onClickAdd = () => {
    const item = {
      id, name, price, img, stock,
    }
    dispatch(addItem(item))
  }

  const rating = getProductRate(product)

  return (
    <div className="card card-compact drop-shadow-xl shadow">
      <figure><img src={img} alt="product" /></figure>
      <div className="card-body">
        <div className="flex flex justify-between">
          <StarsRating rating={rating} size={starSize} />
          <div className="flex">
            <button onClick={likeHandler} type="button" className="p-0 border-0 inline-flex items-center justify-center px-1">
              <LikeIcon className={`hover:fill-sky-600 ${isLiked && 'fill-blue-600'}`} />
            </button>
            <button
              onClick={favoriteHandler}
              type="button"
              className="p-0 border-0 inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`hover:fill-red-400 ${isFavorite && 'fill-rose-600'}`} viewBox="0 0 16 16">
                {
              isFavorite
                ? <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                : <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
              }
              </svg>
            </button>
          </div>
        </div>
        {discount ? (
          <h3 className=" text-lg font-medium text-red-500">
            <span className="text-center w-1/5 font-semibold text-sm line-through text-slate-400">{price}</span>
            {' '}
            {discuontPrice}
            &#8381;
            <span className="bg-red-500 text-red-100 text-xs font-medium ml-5 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-400">
              {discount}
              &#37;
            </span>
          </h3>
        )
          : (
            <h3 className=" text-lg font-medium">
              {price}
              &#8381;
            </h3>
          )}
        <div className="flex justify-between">
          <h4 className="opacity-50">
            {stock}
            шт
          </h4>
          <div>
            { tags?.map((tag) => (
              <div key={createdAt + tag} className="badge badge-secondary">{tag}</div>
            ))}
          </div>
        </div>
        <h2 className="card-title grow">
          {name}
        </h2>
        <div className="card-actions justify-end">
          <Link to={`/products/${id}`} className="btn btn-sm btn-outline btn-secondary">Detail</Link>
          <button onClick={onClickAdd} type="button" className="btn btn-sm btn-outline btn-secondary">
            To cart
            {cartItem && <span className="badge badge-md mx-0.5">{cartItem.count}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
