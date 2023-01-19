import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../../CartItem'

export function Cart() {
  const { items } = useSelector((state) => state.cart)

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {items.length}
                {' '}
                Items
              </h2>
            </div>

            <div className="flex mt-10 mb-5">
              <div>
                <input type="checkbox" className="checkbox checkbox-secondary mx-1" />
              </div>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Select all</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
              <div className="tooltip" data-tip="Delete selected">
                <button className="btn btn-circle btn-outline btn-xs mx-6" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="-2 -2 28 28" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {items?.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.pictures}
                price={item.price}
                stock={item.stock}
                count={item.count}
              />
            ))}

            <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items
                {' '}
                {items.length}
              </span>
              <span className="font-semibold text-sm">590$</span>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button type="button" className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
