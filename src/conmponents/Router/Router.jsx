import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import { Products } from '../Products'
import { Profile } from '../Profile'

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
    ],
  },
])
