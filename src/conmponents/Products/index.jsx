import { useEffect, useState } from 'react'
import { api } from '../../Api/Api'
import { useAuth } from '../../hook/useAuth'
import { Product } from '../Product'

export function Products() {
  const [products, setProducts] = useState([])
  const { token } = useAuth()
  if (!token) {
    return (
      <div>
        <h2>Авторизуйтейсь!</h2>
      </div>
    )
  }
  useEffect(() => {
    api.getAllProducts(token)
      .then(setProducts)
      .catch(alert)
  }, [])

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.products?.map((product) => (
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
