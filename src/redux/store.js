import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/rootReducer'
import { REDUX_LS_KEY } from '../tools/storageKeys'

export const store = configureStore({
  reducer: rootReducer,
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
