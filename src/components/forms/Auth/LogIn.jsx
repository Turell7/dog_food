import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { api } from '../../../tools/Api'
import { Alert } from '../../Alert'
import { REQUIRED_ERROR_MESSAGE } from '../constants'
import { setUser } from '../../../redux/slices/userSlice/userSlice'

export const LOGIN_QUERY_KEY = ['USER_QUERY_KEY']

export function LogIn({ change, submitAdditionAction }) {
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const errorHandler = (answer) => {
    const { message: errorMessage } = answer
    setMessage(errorMessage)
  }
  const userSignIn = (values) => api.userSignIn(values)
    .then((res) => {
      if (!res.err) {
        dispatch(setUser(res))
        submitAdditionAction()
      } else {
        errorHandler(res)
      }
    })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: userSignIn,
    onSubmit: () => {
      queryClient.invalidateQueries({ queryKey: LOGIN_QUERY_KEY })
    },

  })
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object(
        {
          email: Yup.string()
            .email('Invalid email address')
            .required(REQUIRED_ERROR_MESSAGE),
          password: Yup.string()
            .required(REQUIRED_ERROR_MESSAGE)
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 20 characters or less'),
        },
      )}
      onSubmit={mutate}
    >
      <Form className="card-body">
        { message && <Alert message={message} />}
        <div className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <Field name="email" type="text" placeholder="email" className="input input-bordered" />
          <ErrorMessage component="span" name="email" className="error" />
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <Field name="password" type="password" placeholder="password" className="input input-bordered" />
          <ErrorMessage component="span" name="password" className="error" />
          <div className="label">
            <button onClick={() => { change((prev) => !prev) }} type="button" className="link link-primary">
              ???? ?????????????????????????????????
            </button>
          </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-secondary">LogIn</button>
        </div>
      </Form>
    </Formik>
  )
}
