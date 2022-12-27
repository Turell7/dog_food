// import { useState } from 'react'
// import { useEffect, useState } from 'react'
import './App.css'
import { Footer } from './conmponents/Footer'
import { Header } from './conmponents/Header'
import { Main } from './conmponents/Main'
// import { Api } from './conmponents/Api/Api'

// import { RequireAuth } from './hoc/RequireAuth'
import { AuthProvider } from './hoc/AuthProvider'

function App() {
  // const [user, setUser] = useState(localStorage.getItem('userData'))
  // const [token, setToken] = useState(localStorage.getItem('token'))
  // const [api, setApi] = useState(new Api(token))

  // console.log(api)
  // useEffect(() => {
  //   console.log('Change token')
  //   setApi(new Api(token))
  //   setUser(localStorage.getItem('user'))
  // }, [token])
  // useEffect(() => {
  //   if (!user) {
  //     localStorage.removeItem('token')
  //     setToken(null)
  //   }
  // }, [user])
  return (
    <AuthProvider>
      <div className="wrapper-app">
        <Header />
        <Main />
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
