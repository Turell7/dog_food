/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PRODUCTS_QUERY_KEY } from '../components/pages/Products'
import { api } from '../tools/Api'

export const useLike = (product) => {
  const userId = useSelector((store) => store.user.user._id)
  const isLike = product?.likes.findIndex((like) => like === userId) !== -1
  const [isLiked, setIsLiked] = useState(isLike)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => api.toggleProductLike(product._id, isLiked),
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCTS_QUERY_KEY.concat(product.id))
      setIsLiked(!isLiked)
    },
  })

  const likeHandler = (event) => {
    event.preventDefault()
    mutate()
  }

  return {
    isLiked,
    likeHandler,
  }
}
