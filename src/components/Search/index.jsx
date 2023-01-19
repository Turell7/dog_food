import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { setSearch } from '../../redux/slices/searchProductsSlice/searchProductsSlice'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [input, setInput] = useState(() => searchParams.get('q') ?? '')

  const dispatch = useDispatch()

  const setsearchState = (value) => dispatch(setSearch(value))

  const debounceValue = useDebounce(input, 350)

  useEffect(() => {
    setSearchParams({ q: input })
  }, [input])

  useEffect(() => {
    setsearchState(debounceValue)
  }, [debounceValue])

  // const dispatch = useDispatch()

  // const setsearchState = (value) => dispatch(setSearch(value))

  // const testDebounce = useCallback(debounce((event) => {
  //   setsearchState(event.target.value)
  //   console.log('kjkj')
  // }, 350), [])

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}
