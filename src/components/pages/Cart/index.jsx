/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { api } from '../../../tools/Api'
import { CatrEmpty } from '../../CartEmpty/CartEmpty'
import { CartHeader } from '../../CartHeader'
import { CartItem } from '../../CartItem'
import { CartOrderInfo } from '../../CartOrderInfo'
import { Loader } from '../../Loader'

const ITEMS_QUERY_KEY = ['ITEMS_QUERY_KEY']

export function Cart() {
  const { items } = useSelector((state) => state.cart)
  const { token } = useSelector((store) => store.user)

  const productIDs = items.map((item) => item.id)

  const { data, isLoading } = useQuery({
    queryKey: ITEMS_QUERY_KEY.concat(productIDs),
    queryFn: () => api.getProductsByIDs(productIDs),
  })

  if (!token) return <Navigate to="/" />

  if (isLoading) return <Loader />

  if (!items.length) {
    return <CatrEmpty />
  }

  const productPrices = data.map((item) => ({
    id: item._id, price: item.price, discount: item.discount,
  }))

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <CartHeader />
            {data?.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                name={item.name}
                img={item.pictures}
                price={item.price}
                stock={item.stock}
                discount={item.discount}
              />
            ))}
            <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </Link>
          </div>
          <CartOrderInfo productPrices={productPrices} />
        </div>
      </div>
    </div>
  )
}
