import { useDispatch, useSelector } from 'react-redux'
import {
  addItem, minusItem, removeItem, toggleSelect,
} from '../../redux/slices/cartSlice/cartSlice'
import { getDiscountedPrice } from '../../tools/helpers'

export function CartItem({
  id, name, img, price, stock, discount,
}) {
  const dispatch = useDispatch()

  const { items } = useSelector((store) => store.cart)
  const cartItem = items.find((item) => item.id === id)
  const discuontPrice = getDiscountedPrice(price, discount)
  const sumItemPrice = price * cartItem.count
  const sumDiscountItemPrice = discuontPrice * cartItem.count

  const onClickPlus = () => {
    dispatch(addItem({
      id,
    }))
  }

  const onClickMinus = () => {
    dispatch(minusItem(id))
  }

  const selectHendler = () => {
    dispatch(toggleSelect(id))
  }

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div>
        <input checked={cartItem.isSelected} onChange={selectHendler} type="checkbox" className="checkbox checkbox-secondary mx-4" />
      </div>
      <div className="flex w-2/5">
        <div className="w-20">
          <figure><img src={img} alt="product" /></figure>
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{name}</span>
          <span className={`text-xs ${stock === cartItem.count && 'text-red-500'}`}>
            stock:
            {' '}
            {stock}
          </span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button onClick={onClickMinus} className="btn btn-circle bg-gray-200 btn-secondary btn-xs border-0 p-0 inline-flex items-center justify-center text-gray-500" type="button" disabled={cartItem.count === 1}>
          <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <input className="mx-2 border text-center w-8" type="text" value={cartItem.count} readOnly="readonly" />
        <button onClick={onClickPlus} className="btn btn-circle bg-gray-200 btn-secondary btn-xs border-0 p-0 inline-flex items-center justify-center text-gray-500" type="button" disabled={cartItem.count === stock}>
          <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col">
        {discount ? (
          <>
            <span className="text-center w-1/5 font-semibold text-sm line-through text-slate-400">
              {price}
              &#8381;
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
              -
              {discount}
              &#37;
            </span>
            <span className="text-center w-1/5 font-semibold text-base text-red-500">
              {discuontPrice}
              &#8381;
            </span>
          </>
        )
          : (
            <span className="text-center w-1/5 font-semibold text-base">
              {price}
              &#8381;
            </span>
          )}
      </div>
      {discount ? (
        <span className="text-center w-1/5 font-semibold text-base">
          {sumDiscountItemPrice}
          &#8381;
        </span>
      ) : (
        <span className="text-center w-1/5 font-semibold text-base">
          {sumItemPrice}
          &#8381;
        </span>
      )}
      <div className="tooltip" data-tip="Delete item">
        <button onClick={() => dispatch(removeItem(id))} className="btn btn-circle btn-xs bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="-2 -2 28 28" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  )
}
