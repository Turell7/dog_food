import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Cart } from '../conmponents/pages/Cart/Cart'
import { Products } from '../conmponents/pages/Products'
import { Profile } from '../conmponents/pages/Profile'

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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
])
