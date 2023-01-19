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
  user: {
    token: '',
  },
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}

// const userInitialState = {
//   token: null,
//   user: null,
// }

// export const getUserInitialState = () => {
//   const userStateLS = localStorage.getItem(USER_LS_KEY)

//   return userStateLS ? JSON.parse(userStateLS) : userInitialState
// }
