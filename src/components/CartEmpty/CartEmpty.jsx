import { Link } from 'react-router-dom'
import cartEmptyImg from './img/empty-cart.jpg'

export function CatrEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Your cart is empty
        {' '}
        <span>😕</span>
      </h2>
      <img src={cartEmptyImg} alt="Empty cart" />
      <p>
        Before buying, select the product:
        {' '}
        <Link to="/" className="link link-primary">
          <span>go to the catalog</span>
        </Link>
      </p>
    </div>
  )
}
