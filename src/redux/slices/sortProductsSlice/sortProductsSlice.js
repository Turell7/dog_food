/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

export const sortValues = {
  POPULAR: 'POPULAR',
  PRICE_LOW: 'PRICE_LOW',
  PRICE_HIGH: 'PRICE_HIGH',
  RATE: 'RATE',
  NEWEST: 'NEWEST',
  DISCOUNT: 'DISCOUNT',
}

const sortProductsSlice = createSlice({
  name: 'sort',
  initialState: getInitialState().sort,
  reducers: {
    setSort: (state, action) => {
      state.value = action.payload
    },
    clearSort: (state) => {
      state.value = ''
    },
  },
})

export const { setSort, clearSort } = sortProductsSlice.actions
export const sortProductsReducer = sortProductsSlice.reducer
