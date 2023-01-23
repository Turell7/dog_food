import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice/cartSlice'

export function Product({
  id, createdAt, name, img, price, tags, stock, discount,
}) {
  const dispatch = useDispatch()

  const discuontPrice = (price - ((price * discount) / 100))

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      img,
      stock,
    }
    dispatch(addItem(item))
  }

  return (
    <div className="card card-compact drop-shadow-xl shadow">
      {/* Загатовка на переделку бейджеков */}
      {/* <div className="indicator">
        <span className="indicator-item badge badge-primary">new</span>
        <span className="indicator-item badge badge-primary">ыфду</span>
        <div className="grid w-32 h-32 bg-base-300 place-items-center">
          <figure>
            <img src={img} alt="product" />
          </figure>
        </div>
      </div> */}

      <figure><img src={img} alt="product" /></figure>
      <div className="card-body">
        {discount ? (
          <h3 className=" text-lg font-medium text-red-500">
            <span className="text-center w-1/5 font-semibold text-sm line-through text-slate-400">{price}</span>
            {' '}
            {discuontPrice}
            &#8381;
            <span className="bg-red-500 text-red-100 text-xs font-medium ml-5 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-400">
              {discount}
              &#37;
            </span>
          </h3>
        )
          : (
            <h3 className=" text-lg font-medium">
              {price}
              &#8381;
            </h3>
          )}
        <h4 className="opacity-50">
          {stock}
          шт
        </h4>
        <h2 className="card-title grow">
          {name}
          <div>
            { tags?.map((tag) => (
              <div key={createdAt + tag} className="badge badge-secondary">{tag}</div>
            ))}
          </div>
        </h2>
        <div className="card-actions justify-end">
          <Link to={`/products/${id}`} className="btn btn-sm btn-outline btn-secondary">Detail</Link>
          <button onClick={onClickAdd} type="button" className="btn btn-sm btn-outline btn-secondary">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
