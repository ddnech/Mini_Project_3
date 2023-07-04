import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function ShopNew() {
  const token = useSelector((state) => state.auth.token);
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const { name, price, category, description, stock } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category_id', category);
    formData.append('description', description);
    formData.append('stock', stock);
    if (image) {
      formData.append('file', image);
    }

    try {
      const res = await axios.post('http://localhost:8000/api/product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', res.data);

      // Reset form values
      values.name = '';
      values.price = '';
      values.category = '';
      values.description = '';
      values.stock = '';

      setImage('');
      setStatus({ success: true, message: 'Successfully created a new product.' });
    } catch (error) {
      console.error('Error:', error.response.data);
      setStatus({ success: false, message: 'Failed to create a new product.' });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be an integer')
      .positive('Stock must be a positive number'),
  });

  const initialValues = {
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  };

  return (
    <div className='grid justify-center mt-3'>
      <div className='w-screen grid grid-flow-row justify-center'>
        <div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, status }) => (
              <Form>
                <div className='grid grid-flow-row gap-1 justify-center'>
                  {status && status.success && (
                    <p className='text-center text-greenn'>{status.message}</p>
                  )}
                  {status && !status.success && (
                    <p className='text-center text-redd'>{status.message}</p>
                  )}
                  <h3 className='w-72 text-l text-center font-josefin mt-4 text-jetblack tracking-wide font-semibold'>Please fill the product information:</h3>
                  <div className='w-full grid grid-flow-row gap-3'>
                    <div className='font-ysa relative mt-4'>
                      <ErrorMessage name='name' component='div' className='text-redd text-xs absolute -top-5' />
                      <Field className='border border-gray-300 h-6 text-xs w-full focus:border-darkgreen focus:ring-0' type='text' name='name' placeholder='Name' />
                    </div>
                    <div className='font-ysa relative mt-4'>
                      <ErrorMessage name='price' component='div' className='text-redd text-xs absolute -top-5' />
                      <Field className='border border-gray-300 h-6 text-xs w-full focus:border-darkgreen focus:ring-0' type='text' name='price' placeholder='Price' />
                    </div>
                    <div className='font-ysa relative mt-4'>
                      <ErrorMessage name='category' component='div' className='text-redd text-xs absolute -top-5' />
                      <Field className='border border-gray-300 h-6 text-xs w-full focus:border-darkgreen focus:ring-0' type='text' name='category' placeholder='Category' />
                    </div>
                    <div className='font-ysa relative mt-4'>
                      <ErrorMessage name='description' component='div' className='text-redd text-xs absolute -top-5' />
                      <Field className='border border-gray-300 h-6 text-xs w-full focus:border-darkgreen focus:ring-0' type='text' name='description' placeholder='Description' />
                    </div>
                    <div className='font-ysa relative mt-4'>
                      <ErrorMessage name='stock' component='div' className='text-redd text-xs absolute -top-5' />
                      <Field className='border border-gray-300 h-6 text-xs w-full focus:border-darkgreen focus:ring-0' type='text' name='stock' placeholder='Stock' />
                    </div>
                    <label className='font-ysa relative text-jetblack'>Image:</label>
                    <input className='border border-gray-300 h-10 text-xs w-full focus:border-darkgreen focus:ring-0' type='file' onChange={handleImageChange} />
                  </div>
                  <button type='submit' className='bg-darkgreen text-white px-4 py-2 mt-4 rounded hover:bg-darkgreenhover'>
                    Create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
