/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState().user,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.data
    },
  },
})

export const { setUser } = userSlice.actions
export const userSliceReducer = userSlice.reducer
