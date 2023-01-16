import { useDispatch, useSelector } from 'react-redux'
import { setSort, sortValues } from '../../redux/slices/sortProductsSlice/sortProductsSlice'

export function SortProductsBar() {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()

  const changeSortHandler = (e) => {
    if (e.target.id in sortValues) dispatch(setSort(e.target.id))
  }

  return (
    <div className="navbar bg-base-100">
      <button id={sortValues.POPULAR} className={`btn btn-ghost btn-sm ${sortValue === sortValues.POPULAR && 'btn-active'}`} onClick={changeSortHandler} type="button">Popular</button>
      <button id={sortValues.NEWEST} className={`btn btn-ghost btn-sm ${sortValue === sortValues.NEWEST && 'btn-active'}`} onClick={changeSortHandler} type="button">Newest</button>
      <button id={sortValues.PRICE_LOW} className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_LOW && 'btn-active'}`} onClick={changeSortHandler} type="button">Low price</button>
      <button id={sortValues.PRICE_HIGH} className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_HIGH && 'btn-active'}`} onClick={changeSortHandler} type="button">High price</button>
      <button id={sortValues.RATE} className={`btn btn-ghost btn-sm ${sortValue === sortValues.RATE && 'btn-active'}`} onClick={changeSortHandler} type="button">Rate</button>
      <button id={sortValues.DISCOUNT} className={`btn btn-ghost btn-sm ${sortValue === sortValues.DISCOUNT && 'btn-active'}`} onClick={changeSortHandler} type="button">Discount</button>
    </div>
  )
}
