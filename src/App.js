import './App.css'
import { Footer } from './components/layouts/Footer'
import { Header } from './components/layouts/Header'
import { Main } from './components/layouts/Main'

function App() {
  return (
    <div className="wrapper-app">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
