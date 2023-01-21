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
          isSelected: false,
        })
      }
    },
    // plusItem можно выпилить, т.к. его роль так же выполняет addItem
    plusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)

      if (findItem) {
        findItem.count += 1
      }
    },

    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)

      if (findItem) {
        findItem.count -= 1
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },

    toggleSelect(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)
      if (findItem) {
        findItem.isSelected = !findItem.isSelected
      }
    },

    setSelectAll(state, action) {
      state.items.forEach((item) => { item.isSelected = action.payload })
    },

    removeSelectedItems(state) {
      state.items = state.items.filter((item) => !item.isSelected)
      return state
    },

    // addItem(state, action) {
    //   state.items.push(action.payload)
    //   // state.totalPrice = [...state.items, action.payload]
    //   // state.totalPrice = state.items((sum, obj) => obj.price + sum, 0)
    // },
  },
})

export const {
  addItem, clearItems, plusItem, minusItem, removeItem, toggleSelect, setSelectAll,
  removeSelectedItems,
} = cartSlice.actions
export const cartSliceReducer = cartSlice.reducer
