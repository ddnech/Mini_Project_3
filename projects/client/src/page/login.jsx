import React from 'react';
import { useDispatch } from "react-redux";
import { keep } from '../store/reducer/authSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { Modal, Button } from "flowbite-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import NavBar from "../component/navbar"

export default function LogIn() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
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

          resetForm();
          setStatus({ success: true, token });
          // Redirect to homepage
          navigate('/home');
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
  
    const handleForgotPassword = async (values, { setSubmitting, setFieldError, resetForm, setStatus }) => {
      try {
        const response = await axios.put('https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass', { email: values.email });
  
        if (response.status === 200) {
          resetForm();
          setStatus({ success: true });
          // Display a success message or perform any other necessary actions
        } else {
          throw new Error('Forgot password failed');
        }
      } catch (error) {
        setFieldError('email', 'Invalid email');
        setStatus({ success: false });
        // Display an error message or perform any other necessary actions
      } finally {
        setSubmitting(false);
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    const handleGuestSignIn = () => {
      // Redirect to homepage as a guest
      navigate('/home');
    };
  
    const handleSignUp = () => {
      // Redirect to sign up page
      navigate('/signup');
    };
  
    const handleForgot = () => {
      setShowForgotPasswordModal(true);
    };

    return (
      <>
        <div className="sticky top-0 z-50">
                <NavBar />
            </div>
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
                            <button
                            className='w-full hover:bg-gray-400'
                            onClick={handleGuestSignIn}
                            >
                            Sign in as Guest
                            </button>
                            <button
                            className='w-full hover:bg-gray-400'
                            onClick={handleForgot}
                            >
                            Forgot Password
                            </button>
                        </Form>
                        )}
                    </Formik>

                    {showForgotPasswordModal && (
                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white p-8 rounded-md'>
                            <h2 className='text-2xl font-bold mb-4'>Forgot Password</h2>
                            <Formik
                            initialValues={{ email: '' }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Invalid email').required('Email is required'),
                            })}
                            onSubmit={handleForgotPassword}
                            >
                            {({ isSubmitting, status }) => (
                                <Form>
                                {status && status.success && (
                                    <p className='text-green-500'>Password reset email sent!</p>
                                )}
                                <div className='flex flex-col mb-2 pb-3'>
                                    <div className='relative'>
                                    <Field
                                        className='border p-2 w-full'
                                        type='text'
                                        name='email'
                                        placeholder='Email'
                                    />
                                    <ErrorMessage
                                        name='email'
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                    </div>
                                </div>
                                <button
                                    className='w-full py-2 my-4 bg-gray-300 hover:bg-gray-400'
                                    type='submit'
                                    disabled={isSubmitting}
                                >
                                    Reset Password
                                </button>
                                <button
                                    className='w-full py-2 bg-gray-300 hover:bg-gray-400'
                                    onClick={() => setShowForgotPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                                </Form>
                            )}
                            </Formik>
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
      </>
    )
}