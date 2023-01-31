import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setSort, sortValues } from '../../../redux/slices/sortProductsSlice/sortProductsSlice'

export function SortProductsBar() {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams({ sort: sortValue })

  useEffect(() => {
    if (searchParams.get('sort')) {
      dispatch(setSort(searchParams.get('sort')))
    }
  }, [])

  const changeSortHandler = (value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: value,
    })
    dispatch(setSort(value))
  }

  return (
    <div className="navbar bg-base-100">
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.POPULAR && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.POPULAR)} type="button">Popular</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.NEWEST && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.NEWEST)} type="button">Newest</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_LOW && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.PRICE_LOW)} type="button">Low price</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_HIGH && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.PRICE_HIGH)} type="button">High price</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.RATE && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.RATE)} type="button">Rate</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.DISCOUNT && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.DISCOUNT)} type="button">Discount</button>
    </div>
  )
}
