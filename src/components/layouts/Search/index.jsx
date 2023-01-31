import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../../hooks/useDebounce'
import { setSearch } from '../../../redux/slices/searchProductsSlice/searchProductsSlice'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('search') ?? '')
  const dispatch = useDispatch()
  const setsearchState = (value) => dispatch(setSearch(value))
  const debounceValue = useDebounce(input, 350)

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      search: input,
    })
  }, [input])

  useEffect(() => {
    setsearchState(debounceValue)
  }, [debounceValue])

  const searchHandler = (e) => {
    setInput(e.target.value)

    if (!e.target.value) {
      searchParams.delete('search')
      setSearchParams(searchParams)
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        search: e.target.value,
      })
    }
  }

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
        onChange={searchHandler}
      />
    </div>
  )
}
