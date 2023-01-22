import { Logo } from '../../Logo'
import { Social } from '../../Social'
import stylesFooter from './styles.module.scss'

export function Footer() {
  return (
    <footer className="bg-secondary p-4">
      <div className="container mx-auto">
        <div className="flex justify-between item">
          <div className={stylesFooter.left}>
            <Logo />
          </div>
          <div className={stylesFooter.center}>
            <div className={stylesFooter.text}>
              dfsdf
            </div>
          </div>
          <div className={stylesFooter.center}>
            <div className={stylesFooter.text}>
              All rights reserved.
            </div>
          </div>
          <div className={stylesFooter.right}>
            Social Networks
            <Social />
          </div>
        </div>

      </div>
    </footer>
  )
}
