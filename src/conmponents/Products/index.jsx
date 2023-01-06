import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
import { api } from '../../Api/Api'
import { useAuth } from '../../hook/useAuth'
import { Loader } from '../Loader'
import { Product } from '../Product'

export const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']

export function Products() {
  // const [products, setProducts] = useState([])
  const { token } = useAuth()
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
  // useEffect(() => {
  //   api.getAllProducts(token)
  //     .then(setProducts)
  //     .catch(alert)
  // }, [])

  return (
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
  )
}
