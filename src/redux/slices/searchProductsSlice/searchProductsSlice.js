/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const searchProductsSlice = createSlice({
  name: 'search',
  initialState: getInitialState().search,
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
