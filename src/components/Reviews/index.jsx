/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../tools/Api'
import { ReviewsItem } from '../ReviewsItem'

export const ITEM_REVIEWS_QUERY_KEY = ['ITEM_REVIEWS_QUERY_KEY']

export function Reviews() {
  const { id } = useParams()
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState('5')

  const queryClient = useQueryClient()

  const { data: reviews } = useQuery({
    queryKey: ITEM_REVIEWS_QUERY_KEY.concat(id),
    queryFn: () => api.getProductReviews(id),
  })

  const inputChangeHandler = (event) => {
    setReviewText(event.target.value)
  }

  const changeRatingHandler = (event) => {
    setReviewRating(event.target.value)
  }

  const { mutate } = useMutation({
    mutationFn: () => api.addProductReview(id, reviewText, reviewRating),
    onSuccess: () => {
      queryClient.invalidateQueries(ITEM_REVIEWS_QUERY_KEY.concat(id))
      setReviewText('')
      setReviewRating('5')
    },
  })

  return (
    <>
      {/* <div className="w-full p-4 bg-white border border-gray-200
       rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Reviews</h5>
          <Link to="/" className="text-sm font-medium text-blue-600
           hover:underline dark:text-blue-500">
            View all
          </Link>
        </div>
        <div className="flow-root" />
      </div> */}
      <div>
        <input
          className="input w-full input-sm max-w-xs input-bordered input-warning"
          value={reviewText}
          onChange={inputChangeHandler}
          placeholder="Write your review"
        />
        <div className="rating mx-2" value={reviewRating} onChange={changeRatingHandler}>
          <input type="radio" name="rating-1" className="bg-yellow-400 mask mask-star" value="1" />
          <input type="radio" name="rating-1" className="bg-yellow-400 mask mask-star" value="2" />
          <input type="radio" name="rating-1" className="bg-yellow-400 mask mask-star" value="3" />
          <input type="radio" name="rating-1" className="bg-yellow-400 mask mask-star" value="4" />
          <input type="radio" name="rating-1" className="bg-yellow-400 mask mask-star" value="5" />
        </div>
        <button onClick={mutate} type="button" className="ml-auto btn btn-sm btn-outline btn-secondary">Send</button>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {reviews?.map((review) => (
          <ReviewsItem
            key={review._id}
            review={review}
          />
        ))}
      </ul>
    </>
  )
}
