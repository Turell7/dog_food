import {
  createContext, useEffect, useMemo, useState,
} from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))

  const saveUserDataAndToken = (res) => {
    const { token: newToken, data: newUserData } = res
    localStorage.setItem('token', newToken.toString(newToken))
    localStorage.setItem('userData', JSON.stringify(newUserData))
    window.location.reload()
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    window.location.reload()
  }

  useEffect(() => {
    setUser(localStorage.getItem('userData'))
  }, [token])

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('token')
      setToken(null)
    }
  }, [user])

  const value = useMemo(() => ({
    token, user, setToken, logOut, saveUserDataAndToken,
  }), [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
