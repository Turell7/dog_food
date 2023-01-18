import { REDUX_LS_KEY } from '../tools/storageKeys'

const initialState = {
  sort: {
    value: '',
  },
  search: {
    value: '',
  },
  cart: {
    totalPrice: 0,
    items: [],
  },
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}
