/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../../tools/Api'
import { sortProducts } from '../../../tools/helpers'
import { Loader } from '../../UI/Loader'
import { Product } from '../../Product'
import { SortProductsBar } from '../../layouts/SortProductsBar'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export function Products() {
  const search = useSelector((store) => store.search.value)
  const { token } = useSelector((store) => store.user)
  const getProductsQueryKey = () => PRODUCTS_QUERY_KEY.concat(Object.values(search), token)

  const sortValue = useSelector((store) => store.sort.value)

  const getAllProducts = () => api.getAllProducts(search)

  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(search),
    queryFn: getAllProducts,
  })

  if (!token) {
    return (
      <div>
        <h2>Авторизуйтейсь!</h2>
      </div>
    )
  }

  if (isLoading) return <Loader />
  const products = search !== '' ? data : data.products
  sortProducts(products, sortValue)

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
            discount={product.discount}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
