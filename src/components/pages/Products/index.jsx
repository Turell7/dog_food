/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
// import { useAuth } from '../../../hooks/useAuth'
import { api } from '../../../tools/Api'
import { sortProducts } from '../../../tools/sortProducts'
import { Loader } from '../../Loader'
import { Product } from '../../Product'
import { SortProductsBar } from '../../SortProductsBar'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export function Products() {
  const search = useSelector((store) => store.search.value)
  const getProductsQueryKey = () => PRODUCTS_QUERY_KEY.concat(Object.values(search))

  const sortValue = useSelector((store) => store.sort.value)
  // const { token } = useAuth()
  const { token } = useSelector((store) => store.user)

  const getAllProducts = () => api.getAllProducts(token, search)
  console.log({ token })
  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(search),
    queryFn: getAllProducts,
  })

  console.log(data)

  if (isLoading) return <Loader />
  const products = search !== '' ? data : data.products
  sortProducts(products, sortValue)

  if (!token) {
    return (
      <div>
        <h2>Авторизуйтейсь!</h2>
      </div>
    )
  }

  // const { _id: id } = products
  return (
    <>
      {products.length && <SortProductsBar />}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            img={product.pictures}
            price={product.price}
            tags={product.tags}
            createdAt={product.created_at}
            stock={product.stock}
          />
        ))}
      </div>
    </>
  )
}
