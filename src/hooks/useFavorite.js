import { useDispatch, useSelector } from 'react-redux'
import { addProductFavorite, removeProductFavorite } from '../redux/slices/favoriteSlice/favoriteSlice'

export const useFavorite = (prodId) => {
  const favorites = useSelector((store) => store.favorite)
  const isFavorite = favorites.includes(prodId)
  const dispatch = useDispatch()

  const favoriteHandler = (event) => {
    event.preventDefault()
    if (isFavorite) {
      dispatch(removeProductFavorite(prodId))
    } else {
      dispatch(addProductFavorite(prodId))
    }
  }

  return {
    isFavorite,
    favoriteHandler,
  }
}
