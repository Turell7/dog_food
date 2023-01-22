import { useDispatch, useSelector } from 'react-redux'
import { setSort, sortValues } from '../../../redux/slices/sortProductsSlice/sortProductsSlice'

export function SortProductsBar() {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()

  return (
    <div className="navbar bg-base-100">
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.POPULAR && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.POPULAR))} type="button">Popular</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.NEWEST && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.NEWEST))} type="button">Newest</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_LOW && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.PRICE_LOW))} type="button">Low price</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_HIGH && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.PRICE_HIGH))} type="button">High price</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.RATE && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.RATE))} type="button">Rate</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.DISCOUNT && 'btn-active'}`} onClick={() => dispatch(setSort(sortValues.DISCOUNT))} type="button">Discount</button>
    </div>
  )
}
