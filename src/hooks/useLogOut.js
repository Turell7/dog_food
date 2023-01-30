import { useDispatch } from 'react-redux'
import { clearItems } from '../redux/slices/cartSlice/cartSlice'
import { clearSearch } from '../redux/slices/searchProductsSlice/searchProductsSlice'
import { clearSort } from '../redux/slices/sortProductsSlice/sortProductsSlice'
import { removeUser } from '../redux/slices/userSlice/userSlice'

export const useLogOut = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(removeUser())
    dispatch(clearSort())
    dispatch(clearSearch())
    dispatch(clearItems())
  }

  return {
    logOut,
  }
}
