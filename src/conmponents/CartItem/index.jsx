import { Link } from 'react-router-dom'

export function CartImtem() {
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div>
        <input type="checkbox" className="checkbox checkbox-secondary mx-4 " />
      </div>
      <div className="flex w-2/5">
        {/* <!-- product --> */}
        <div className="w-20">
          <img className="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="product" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">Iphone 6S</span>
          <span className="text-red-500 text-xs">Apple</span>
          <Link to="/" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</Link>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button className="btn btn-outline btn-secondary btn-xs border-white" type="button">
          <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <input className="mx-2 border text-center w-8" type="text" value="1" />
        <button className="btn btn-outline btn-secondary btn-xs border-white" type="button">
          <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
      <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
      <div className="tooltip" data-tip="Delete item">
        <button className="btn btn-circle btn-outline btn-xs mx-8" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="-2 -2 28 28" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  )
}
