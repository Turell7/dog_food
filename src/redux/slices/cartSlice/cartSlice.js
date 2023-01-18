/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
      // state.totalPrice = state.items((sum, obj) => obj.price + sum, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions
export const cartSliceReducer = cartSlice.reducer
