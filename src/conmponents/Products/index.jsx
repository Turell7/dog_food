import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../Api/Api'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../Loader'
import { Product } from '../Product'
import { SortProductsBar } from '../SortProductsBar'
import { sortProducts } from './sortProducts'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export function Products() {
  const search = useSelector((store) => store.search.value)
  const getProductsQueryKey = () => PRODUCTS_QUERY_KEY.concat(Object.values(search))

  const sortValue = useSelector((store) => store.sort.value)
  const { token } = useAuth()
  if (!token) {
    return (
      <div>
        <h2>Авторизуйтейсь!</h2>
      </div>
    )
  }

  const getAllProducts = () => api.getAllProducts(token, search)

  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(search),
    queryFn: getAllProducts,
  })

  if (isLoading) return <Loader />

  const products = search !== '' ? data : data.products

  sortProducts(products, sortValue)
  return (
    <>
      {products.length && <SortProductsBar />}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
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
