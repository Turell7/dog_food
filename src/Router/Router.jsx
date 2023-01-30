import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Cart } from '../components/pages/Cart'
import { FavoriteProducts } from '../components/pages/FavoriteProducts'
import { ProductDetail } from '../components/pages/ProductDetail'
import { Products } from '../components/pages/Products'
import { Profile } from '../components/pages/Profile'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/favorites',
        element: <FavoriteProducts />,
      },
    ],
  },
])
