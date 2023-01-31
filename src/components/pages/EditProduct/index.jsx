/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../../../tools/Api'
import { ITEM_DETAIL_QUERY_KEY } from '../../../tools/queryKey'

export function EditProduct() {
  const token = useSelector((store) => store.user.token)
  const { id } = useParams()

  const { data: product } = useQuery({
    queryKey: ITEM_DETAIL_QUERY_KEY.concat(id),
    queryFn: () => api.getProductById(id),
  })

  const navigate = useNavigate()

  const successHandler = (res) => {
    navigate(`/products/${res._id}`)
  }

  const { mutate } = useMutation({
    mutationFn: (productData) => api.editProduct(productData, id),
    onSuccess: successHandler,
  })

  if (!token) return <Navigate to="/" />

  return (
    <Formik
      initialValues={{
        name: product.name,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        wight: product.wight,
        pictures: product.pictures,
        description: product.description,
      }}
      validationSchema={Yup.object(
        {
          name: Yup.string()
            .min(2, 'More than 2 symbols')
            .max(40, 'Max 40 symbols')
            .required('Please set name'),
          price: Yup.number()
            .min(1, 'Cant be < 1')
            .required('empty'),
          discount: Yup.number()
            .min(0, 'Must be positive'),
          stock: Yup.number()
            .min(1, 'Min 1 item on stock'),
          wight: Yup.string()
            .min(2, 'More than 2 symbols')
            .max(20, 'Max 20 symbols'),
          pictures: Yup.string().url()
            .min(2, 'More than 2 symbols')
            .max(200, 'Max 100 symbols')
            .required('Please set image url'),
          description: Yup.string()
            .min(10, 'More than 10 symbols')
            .max(500, 'Max 500 symbols')
            .required('Please set description'),
        },
      )}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      <Form name="addProduct" className="card-body grid grid-cols-2">
        {/* { message && <Alert message={message} />} */}
        <div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Product name</span>
            </div>
            <Field name="name" type="text" placeholder="A bone for cleaning dog teeth" className="input input-bordered" />
            <ErrorMessage component="span" name="email" className="error" />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <Field name="price" type="number" placeholder="100" className="input input-bordered" />
            <ErrorMessage component="span" name="price" className="error" />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Discount (%)</span>
            </div>
            <Field as="select" name="discount" className="input input-bordered">
              <option value={0}>Без скидки</option>
              <option value={5}>5%</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
              <option value={20}>20%</option>
              <option value={25}>25%</option>
            </Field>
            <ErrorMessage component="span" name="discount" className="error" />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Stock (pc)</span>
            </div>
            <Field name="stock" type="number" placeholder="10" className="input input-bordered" />
            <ErrorMessage component="span" name="stock" className="error" />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Wight (g)</span>
            </div>
            <Field name="wight" type="text" placeholder="100 г" className="input input-bordered" />
            <ErrorMessage component="span" name="wight" className="error" />
          </div>
        </div>
        <div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Pictures</span>
            </div>
            <Field name="pictures" type="url" placeholder="https://example.com/pictures.png" className="input input-bordered" />
            <ErrorMessage component="span" name="pictures" className="error" />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <Field as="textarea" name="description" type="textarea" placeholder="100" className="textarea textarea-bordered" />
            <ErrorMessage component="span" name="description" className="error" />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-secondary">Update product</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
