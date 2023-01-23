import { Link, Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../../tools/Api'
import { Loader } from '../../Loader'

const ITEM_DETAIL_QUERY_KEY = ['ITEM_DETAIL_QUERY_KEY']

export function ProductDetail() {
  const { id } = useParams()
  const { token } = useSelector((store) => store.user)

  const { data: product, isLoading } = useQuery({
    queryKey: ITEM_DETAIL_QUERY_KEY.concat(id),
    queryFn: () => api.getProductById(id),
  })
  if (!token) return <Navigate to="/" />
  if (isLoading) return <Loader />
  const discuontPrice = (product.price - ((product.price * product.discount) / 100))

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="product" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.pictures} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
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
              <div className="rating rating-md rating-half">
                <input type="radio" name="rating-10" className="rating-hidden" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" checked />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
              </div>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <Link to="/" className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </Link>
                <Link to="/" className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </Link>
                <Link to="/" className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </Link>
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
              <button type="button" className="flex ml-auto text-white btn btn-primary">Buy</button>
              <button type="button" className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
