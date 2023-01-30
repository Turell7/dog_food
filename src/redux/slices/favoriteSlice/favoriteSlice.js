import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: getInitialState().favorite,
  reducers: {
    addProductFavorite: (state, action) => {
      state.push(action.payload)
    },
    removeProductFavorite: (state, action) => state.filter((id) => id !== action.payload),
    clearFavoriteList: () => [],
  },
})

export const {
  addProductFavorite, removeProductFavorite,
} = favoriteSlice.actions
export const favoriteSliceReducer = favoriteSlice.reducer
