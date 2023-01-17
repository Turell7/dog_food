import { combineReducers } from '@reduxjs/toolkit'
import { searchProductsReducer } from '../slices/searchProductsSlice/searchProductsSlice'
import { sortProductsReducer } from '../slices/sortProductsSlice/sortProductsSlice'

export const rootReducer = combineReducers({
  sort: sortProductsReducer,
  search: searchProductsReducer,
})
