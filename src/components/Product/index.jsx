/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice/cartSlice'
import { api } from '../../tools/Api'
import { getDiscountedPrice, getProductRate } from '../../tools/helpers'
import { PRODUCTS_QUERY_KEY } from '../pages/Products'
import { StarsRating } from '../UI/StarsRating'
import { ReactComponent as LikeIcon } from '../UI/icons/ic-like.svg'
import { ReactComponent as FavoriteIcon } from '../UI/icons/ic-favorites.svg'

export function Product({
  id, createdAt, name, img, price, tags, stock, discount, product,
}) {
  const dispatch = useDispatch()
  const discuontPrice = getDiscountedPrice(price, discount)
  const userId = useSelector((state) => state.user.user._id)
  const isLiked = product.likes.findIndex((like) => like === userId) !== -1

  const queryClient = useQueryClient()

  const onClickAdd = () => {
    const item = {
      id, name, price, img, stock,
    }
    dispatch(addItem(item))
  }

  const rating = getProductRate(product)

  const { mutate } = useMutation({
    mutationFn: () => api.toggleProductLike(id, isLiked),
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCTS_QUERY_KEY.concat(id))
    },
  })

  const likeHandler = (event) => {
    event.preventDefault()
    mutate()
  }

  return (
    <div className="card card-compact drop-shadow-xl shadow">
      {/* Загатовка на переделку бейджеков */}
      {/* <div className="indicator">
        <span className="indicator-item badge badge-primary">new</span>
        <span className="indicator-item badge badge-primary">ыфду</span>
        <div className="grid w-32 h-32 bg-base-300 place-items-center">
          <figure>
            <img src={img} alt="product" />
          </figure>
        </div>
      </div> */}

      <figure><img src={img} alt="product" /></figure>
      <div className="card-body">
        <div>
          <StarsRating rating={rating} />
          <button onClick={likeHandler} type="button" className="p-0 border-0 fill-blue-500 inline-flex items-center justify-center">
            <LikeIcon className={`hover:fill-sky-600 ${isLiked && 'fill-blue-600'}`} />
          </button>
          <button type="button" className="p-0 border-0 fill-blue-500 inline-flex items-center justify-center">
            <FavoriteIcon className={`hover:fill-sky-600 ${isLiked && 'fill-blue-600'}`} />
          </button>
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
        <h4 className="opacity-50">
          {stock}
          шт
        </h4>
        <h2 className="card-title grow">
          {name}
          <div>
            { tags?.map((tag) => (
              <div key={createdAt + tag} className="badge badge-secondary">{tag}</div>
            ))}
          </div>
        </h2>
        <div className="card-actions justify-end">
          <Link to={`/products/${id}`} className="btn btn-sm btn-outline btn-secondary">Detail</Link>
          <button onClick={onClickAdd} type="button" className="btn btn-sm btn-outline btn-secondary">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
