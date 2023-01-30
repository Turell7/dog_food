import { combineReducers } from '@reduxjs/toolkit'
import { cartSliceReducer } from '../slices/cartSlice/cartSlice'
import { favoriteSliceReducer } from '../slices/favoriteSlice/favoriteSlice'
import { searchProductsReducer } from '../slices/searchProductsSlice/searchProductsSlice'
import { sortProductsReducer } from '../slices/sortProductsSlice/sortProductsSlice'
import { userSliceReducer } from '../slices/userSlice/userSlice'

export const rootReducer = combineReducers({
  sort: sortProductsReducer,
  search: searchProductsReducer,
  cart: cartSliceReducer,
  user: userSliceReducer,
  favorite: favoriteSliceReducer,
})
