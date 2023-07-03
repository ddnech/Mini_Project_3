import React from 'react';
import { useDispatch } from "react-redux";
import { keep } from '../../store/reducer/authSlice';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function LoginUser() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
  
    const initialValues = {
      username: '',
      password: '',
    };
  
    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    });
  
    const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm, setStatus }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', values);
  
        if (response.status === 200) {
          const { token } = response.data;
  
          localStorage.setItem('token', token);
          dispatch(keep(token));
          resetForm();
          setStatus({ success: true, token });
          // Redirect to homepage
          navigate('/');
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        setFieldError('username', 'Incorrect username or password');
        setFieldError('password', 'Incorrect username or password');
        setStatus({ success: false });
      } finally {
        setSubmitting(false);
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    const handleSignUp = () => {
      // Redirect to sign up page
      navigate('/signup');
    };
  

    return (
      <>
            <div className='w-full h-screen flex'>
                <div className=' m-auto center'>
                    <div className='p-4 flex flex-col justify-around'>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, status }) => (
                        <Form className='relative'>
                            <h2 className='text-4xl  text-center h-16 font-lora'>Login</h2>
                            <p className='text-center mb-8 h-4 font-chivo tracking-wide'>Please enter your username and password</p>
                            {status && status.success && <p className='text-center text-green-500'>Login successful!</p>}
                            <div className='flex flex-col mb-2 pb-3'>
                            <div className='relative'>
                                <Field
                                className='border p-1 w-full pr-10'
                                type='text'
                                name='username'
                                placeholder='Username'
                                />
                                <ErrorMessage name='username' component='div' className='text-red-500 text-sm absolute left-0 bottom-[-20px]' />
                            </div>
                            </div>
                            <div className='flex flex-col mb-4'>
                            <div className='relative'>
                                <Field
                                className='border p-1 w-full pr-10'
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                />
                                <ErrorMessage name='password' component='div' className='text-red-500 text-sm absolute left-0 bottom-[-20px]' />
                                <div className='pt-2 pl-1'>
                                <button
                                    type='button'
                                    onClick={togglePasswordVisibility}
                                    className='text-gray-500 focus:outline-none'
                                >
                                    {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                                </button>
                                </div>
                            </div>
                            </div>
                            <button
                            className='w-full py-2 my-4 bg-gray-300 hover:bg-gray-400'
                            type='submit'
                            disabled={isSubmitting}
                            >
                            Sign In
                            </button>
                            {status && status.token && <p className='text-center'>Token: {status.token}</p>}
                            <button
                            className='w-full py-2 my-4 bg-gray-300 hover:bg-gray-400'
                            onClick={handleSignUp}
                            >
                            Sign Up
                            </button>
                        </Form>
                        )}
                    </Formik>
                    </div>
                </div>
                </div>
      </>
    )
}