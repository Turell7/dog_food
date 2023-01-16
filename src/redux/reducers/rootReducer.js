import { combineReducers } from '@reduxjs/toolkit'
import { sortProductsReducer } from '../slices/sortProductsSlice/sortProductsSlice'

export const rootReducer = combineReducers({
  sort: sortProductsReducer,
})
