/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../tools/Api'
import { Product } from '../../Product'
import { Loader } from '../../UI/Loader'
import { PRODUCTS_QUERY_KEY } from '../Products'

export function FavoriteProducts() {
  const productIds = useSelector((store) => store.favorite)
  const navigate = useNavigate()

  if (!productIds.length) return navigate('/')

  const { data: products, isLoading } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY.concat(productIds),
    queryFn: () => api.getProductsByIDs(productIds),
  })

  if (isLoading) return <Loader />
  return (
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
  )
}
