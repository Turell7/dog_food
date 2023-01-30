import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useLogOut } from '../../../hooks/useLogOut'
import { api } from '../../../tools/Api'

export const USER_QUERY_KEY = ['USER_QUERY_KEY']

export function Profile() {
  const { token } = useSelector((store) => store.user)
  const { logOut } = useLogOut()
  const getInfoAboutMe = () => api.getInfoAboutMe()

  const { data } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getInfoAboutMe,
  })

  if (!token) return <Navigate to="/" />

  return (
    <div className="my-10">
      {data
      && (
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="text-center p-6  border-b">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <img src={data.avatar} alt="avatar" />
            </div>
          </div>
          <p className="pt-2 text-lg font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">{data.email}</p>
          <div className="mt-5">
            <Link
              to="/profile"
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700"
            >
              Manage your Account
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div className="px-4 py-2 hover:bg-gray-100 flex">
            <div className="text-gray-800">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">Status</p>
              <p className="text-xs text-gray-500">{data.about}</p>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 flex">
            <div className="text-gray-800">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">Account settings</p>
              <p className="text-xs text-gray-500">Email, profile, ...</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
            <p className="text-sm font-medium text-gray-800 leading-none">Products in the basket</p>
          </div>
          <div className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
            <p className="text-sm font-medium text-gray-800 leading-none">Paid orders</p>
          </div>
          <div className="flex justify-center">
            <button onClick={logOut} type="button" className="btn btn-wide">
              Log out
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
