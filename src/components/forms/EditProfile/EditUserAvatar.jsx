import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { api } from '../../../tools/Api'
import { USER_QUERY_KEY } from '../../../tools/queryKey'

export function EditUserAvatar({ change, submitAdditionAction, user }) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (userAvatar) => api.editUserAvatar(userAvatar),
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY, user)
      submitAdditionAction()
    },
  })

  return (
    <Formik
      initialValues={{
        avatar: user.avatar,
        // name: user.name,
        // about: user.about,
      }}
      validationSchema={Yup.object(
        {
          avatar: Yup.string().url()
            .min(2, 'More than 2 symbols')
            .max(200, 'Max 200 symbols')
            .required('Please set image url'),
        //   name: Yup.string()
        //     .min(2, 'More than 2 symbols')
        //     .max(40, 'Max 40 symbols')
        //     .required('Please set name'),
        //   about: Yup.string()
        //     .min(10, 'More than 10 symbols')
        //     .max(200, 'Max 200 symbols')
        //     .required('Please set status'),
        },
      )}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      <Form className="card-body">
        {/* { message && <Alert message={message} />} */}
        <div className="form-control">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <img src={user.avatar} alt="old avatar" />
            </div>
          </div>
          <div className="label">
            <span className="label-text">Avatar</span>
          </div>
          <Field name="avatar" type="url" placeholder="https://example.com/pictures.png" className="input input-bordered" />
          <ErrorMessage component="span" name="avatar" className="error" />
        </div>
        <button onClick={() => { change((prev) => !prev) }} type="button" className="link link-primary">
          Editit Name & Status
        </button>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-secondary">Update</button>
        </div>
      </Form>
    </Formik>
  )
}
