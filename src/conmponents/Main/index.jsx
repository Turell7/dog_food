import { Outlet } from 'react-router-dom'
import stylesMain from './styles.module.scss'

export function Main() {
  return (
    <main className={stylesMain.main}>

      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
  )
}
