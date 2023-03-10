/* eslint-disable no-underscore-dangle */
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../../tools/Api'
import { Loader } from '../../UI/Loader'
import { addItem } from '../../../redux/slices/cartSlice/cartSlice'
import { getDiscountedPrice, getProductRate } from '../../../tools/helpers'
import { Reviews } from '../../Reviews'
import { StarsRating } from '../../UI/StarsRating'
import { ReactComponent as LikeIcon } from '../../UI/icons/ic-like.svg'
import { useFavorite } from '../../../hooks/useFavorite'
import { useLike } from '../../../hooks/useLike'
import { ITEM_DETAIL_QUERY_KEY } from '../../../tools/queryKey'

export function ProductDetail() {
  const { id } = useParams()
  const { token, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector((store) => store.cart)
  const cartItem = items.find((item) => item.id === id)

  const { data: product, isLoading } = useQuery({
    queryKey: ITEM_DETAIL_QUERY_KEY.concat(id),
    queryFn: () => api.getProductById(id),
  })

  const {
    isLiked,
    likeHandler,
  } = useLike(product)

  const {
    isFavorite,
    favoriteHandler,
  } = useFavorite(id)

  const onClickAdd = () => {
    const item = {
      id, name: product.name, price: product.price, img: product.pictures, stock: product.stock,
    }
    dispatch(addItem(item))
  }

  const { mutate } = useMutation({
    mutationFn: () => api.deleteProduct(id),
    onSuccess: () => {
      navigate('/')
    },
  })

  const removeHandler = () => {
    mutate()
  }

  if (!token) return <Navigate to="/" />
  if (isLoading) return <Loader />
  const rating = getProductRate(product)
  const discuontPrice = getDiscountedPrice(product.price, product.discount)

  return (
    <div className="grid grid-cols-2">
      <img alt="product" className="lg:w-8/12 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.pictures} />
      <div className="lg:w-11/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <div className="flex flex-wrap -m-4">
          <div className="p-4">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img className="w-12 mask mask-squircle" src={product.author.avatar} alt="avatar" />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">
                  Seller:
                  {' '}
                  {product.author.name}
                </h2>
                <span className="text-gray-500 mb-3">{product.author.about}</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
        <div className="flex mb-4">
          <StarsRating rating={rating} />
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <button
              onClick={likeHandler}
              type="button"
              className="p-0 border-0 inline-flex items-center justify-center px-0.5"
            >
              <LikeIcon className={`hover:fill-sky-600 ${isLiked && 'fill-blue-600'}`} />
            </button>
            <button
              onClick={favoriteHandler}
              type="button"
              className="p-0 border-0 inline-flex items-center justify-center px-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`hover:fill-red-400 ${isFavorite && 'fill-rose-600'}`} viewBox="0 0 16 16">
                {
              isFavorite
                ? (
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0
                 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183
                  0 4.92 0 2.755 1.79 1 4 1z"
                  />
                )
                : (
                  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776
                  2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146
                  1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024
                   3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326
                    13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8
                     6.236zm.392 8.292a.513.513 0 0 1-.784
                      0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755
                       1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55
                        0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3
                         3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"
                  />
                )
              }
              </svg>
            </button>
            {user._id === product.author._id && (
              <>
                <button onClick={() => navigate('edit')} type="button" className="btn btn-info btn-circle btn-sm bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </button>
                <button onClick={removeHandler} type="button" className="btn btn-error btn-circle btn-sm bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </button>
              </>
            )}

          </span>
        </div>
        <p className="leading-relaxed">{product.description}</p>
        <p className="leading-relaxed">{product.wight}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          {/* button & toggle */}
        </div>
        <div className="flex">
          {product.discount ? (
            <h3 className=" text-lg font-medium text-red-500">
              <span className="text-center w-1/5 font-semibold text-lg line-through text-slate-400">
                {product.price}
                &#8381;
                {' '}
              </span>
              {' '}
              <span className="title-font font-medium text-2xl text-red-500">
                {discuontPrice}
                &#8381;
              </span>
              <span className="bg-red-500 text-red-100 text-xs font-medium ml-5 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-400">
                {product.discount}
                &#37;
              </span>
            </h3>
          )
            : (
              <h3>
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price}
                  &#8381;
                </span>
              </h3>
            )}
          <button onClick={onClickAdd} type="button" className="flex ml-auto btn btn-sm btn-outline btn-secondary">
            Add to cart
            {cartItem && <span className="badge badge-md mx-0.5">{cartItem.count}</span>}
          </button>
        </div>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5" />
        <Reviews />
      </div>
    </div>
  )
}
