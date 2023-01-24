import { useSelector } from 'react-redux'
import { getOrderInfo } from '../../tools/helpers'

export function CartOrderInfo({ productPrices }) {
  const { items } = useSelector((state) => state.cart)
  const { total, discount, totalItems } = getOrderInfo(productPrices, items)

  return (
    <div id="summary" className="w-1/4 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-base uppercase">
          Items to purchase:
        </span>
        <span className="font-semibold text-base">{totalItems}</span>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-base uppercase">
          Discount:
        </span>
        <span className="font-semibold text-base text-red-500">
          {discount}
          &#8381;
        </span>
      </div>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-base uppercase">
          <span>Total cost:</span>
          <span className="font-semibold text-base">
            {total}
            &#8381;
          </span>
        </div>
        <button type="button" className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
      </div>
    </div>
  )
}
