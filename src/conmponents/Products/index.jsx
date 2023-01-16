import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../Api/Api'
import { useAuth } from '../../hook/useAuth'
import { Loader } from '../Loader'
import { Product } from '../Product'
import { SortProductsBar } from '../SortProductsBar'
import { sortProducts } from './sortProducts'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export function Products() {
  const sortValue = useSelector((store) => store.sort.value)
  const { token } = useAuth()
  // console.log({ sortValue })
  if (!token) {
    return (
      <div>
        <h2>Авторизуйтейсь!</h2>
      </div>
    )
  }

  const getAllProducts = () => api.getAllProducts(token)

  const { data: products, isLoading } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getAllProducts,
  })

  if (isLoading) return <Loader />

  // console.log('TEST')
  sortProducts(products.products, sortValue)

  console.log({ products })

  return (
    <>
      {products.products.length && <SortProductsBar />}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.products.map((product) => (
          <Product
            key={product.created_at}
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
