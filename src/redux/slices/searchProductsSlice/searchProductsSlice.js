/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

const searchProductsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
    clearSearch: (state) => {
      state.value = ''
    },
  },
})

export const { setSearch, clearSearch } = searchProductsSlice.actions
export const searchProductsReducer = searchProductsSlice.reducer
