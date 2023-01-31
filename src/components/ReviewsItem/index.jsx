/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../tools/Api'
import { ITEM_REVIEWS_QUERY_KEY } from '../Reviews'
import { StarsRating } from '../UI/StarsRating'

export function ReviewsItem({ review }) {
  const sizeRating = '24px'

  const userId = useSelector((state) => state.user.user._id)
  const isDeleteAvailable = userId === review.author._id
  const queryClient = useQueryClient()

  const onSuccessHandler = () => {
    queryClient.invalidateQueries(ITEM_REVIEWS_QUERY_KEY.concat(review.product))
  }

  const { mutate } = useMutation({
    mutationFn: () => api.deleteProductReview(review.product, review._id),
    onSuccess: onSuccessHandler,
  })

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="w-10 mask mask-squircle" src={review.author.avatar} alt="Avatar" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {review.author.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {review.text}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <StarsRating rating={review.rating} size={sizeRating} />
        </div>
        {isDeleteAvailable && (
        <button onClick={mutate} type="button" className="btn btn-error btn-circle btn-sm bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </button>
        )}
      </div>
    </li>
  )
}
