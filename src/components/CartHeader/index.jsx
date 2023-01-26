import { useDispatch, useSelector } from 'react-redux'
import { removeSelectedItems, setSelectAll } from '../../redux/slices/cartSlice/cartSlice'

export function CartHeader() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)
  const allSelected = items.every((item) => item.isSelected)

  const selesctHandler = (event) => {
    dispatch(setSelectAll(event.target.checked))
  }

  return (
    <>
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">
          Unique items:
          {' '}
          {items.length}

        </h2>
      </div>

      <div className="flex mt-10 mb-5">
        <div className="tooltip" data-tip="Select All">
          <input checked={allSelected} onChange={selesctHandler} type="checkbox" className="checkbox checkbox-secondary mx-1" />
        </div>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/2 text-center">Product Details</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        <div className="tooltip" data-tip="Delete selected">
          <button onClick={() => dispatch(removeSelectedItems())} className="btn btn-circle btn-sm bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="-2 -2 28 28" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}
