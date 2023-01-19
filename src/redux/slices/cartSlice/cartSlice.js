/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
    },

    plusItem(action, state) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem) {
        findItem.count += 1
      }
    },

    minusItem(action, state) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem) {
        findItem.count -= 1
      }
    },

    // addItem(state, action) {
    //   state.items.push(action.payload)
    //   // state.totalPrice = [...state.items, action.payload]
    //   // state.totalPrice = state.items((sum, obj) => obj.price + sum, 0)
    // },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },
  },
})

export const {
  addItem, clearItems, plusItem, minusItem, removeItem,
} = cartSlice.actions
export const cartSliceReducer = cartSlice.reducer
