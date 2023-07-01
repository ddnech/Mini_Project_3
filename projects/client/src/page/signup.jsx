import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiFillEye } from 'react-icons/ai'

export default function LogIn() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const initialValues = {
        username: '',
        storeName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    };

    const validRgx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const pwdRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-_+=!@#$%^&])(?=.{6,})/;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        storeName: Yup.string().required("Store name is required"),
        email: Yup.string().email('Please use a valid email format').required('Email is required'),
        phone: Yup.string().required('Phone is required').matches(validRgx, "Phone number is not valid"),
        address: Yup.string().required("Address is required"),
        password: Yup.string().matches(pwdRgx, 'At least 6 characters, 1 symbol, and 1 capital letter'
        ).required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const response = await axios.post('https://localhost:8000/api/auth/register', values);

            if (response.status === 200) {
                const token = response.data;
                console.log('Token:', token);
                resetForm();
                setStatus({ success: true, token });
                setStatus({ success: true, message: 'Sign up successful!' });
            } else {
                throw new Error('Sign up Failed');
            }
        } catch (error) {
            setStatus({ success: false });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='w-screen h-[48rem] grid justify-center mt-3'>
            <div className='w-[28rem] h-[44rem] grid grid-flow-row rounded overflow-hidden shadow-2xl'>
                <div className='bg-header w-full h-32 object-cover bg-no-repeat bg-center bg-cover grid'>
                    <div className='font-monts font-bold text-6xl text-center text-ivory drop-shadow-5xl m-6'>verdant market</div>
                </div>
                <div className='h-[35rem]'>
                    <div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting, status }) => (
                                <Form>
                                    <div className='grid grid-flow-row gap-1 justify-center'>
                                        <h3 className='font-monts font-bold text-xl text-center text-darkcho m-4'>WELCOME!</h3>
                                        <div className='grid grid-flow-row gap-3 w-60'>
                                            {status && status.success && (
                                                <p className="text-center text-greenn">{status.message}</p>
                                            )}
                                            <ErrorMessage name='username' component='div' className='text-redd text-xs' />
                                            <Field className='border-none h-6' type='text' name='username' placeholder='Username' />
                                            <ErrorMessage name='storeName' component='div' className='text-redd text-xs' />
                                            <Field className='border-none h-6' type='text' name='storeName' placeholder='Store Name' />
                                            <ErrorMessage name='email' component='div' className='text-redd text-xs' />
                                            <Field className='border-none h-6' type='email' name='email' placeholder='Email' />
                                            <ErrorMessage name='phone' component='div' className='text-redd text-xs' />
                                            <Field className='border-none h-6' type='text' name='phone' placeholder='Phone' />
                                            <ErrorMessage name='address' component='div' className='text-redd text-xs' />
                                            <Field className='border-none h-6' type='text' name='address' placeholder='Address' />
                                            <ErrorMessage name='password' component='div' className='text-redd text-xs' />
                                            <Field
                                                className='border-none h-6'
                                                type={showPassword ? 'text' : 'password'}
                                                name='password'
                                                placeholder='Password'
                                            />
                                            <ErrorMessage name='confirmPassword' component='div' className='text-redd text-xs' />
                                            <Field
                                                className='border-none h-6'
                                                type={showPassword ? 'text' : 'password'}
                                                name='confirmPassword'
                                                placeholder='Confirm Password'
                                            />
                                        </div>
                                        <div className='grid grid-flow-col justify-start'>
                                            <button onClick={togglePassword} className='m-1'><span className='flex content-center h-5'><AiFillEye />Show Password</span></button>
                                        </div>
                                        <button
                                            className='w-full py-2 my-4 bg-olive text-ivory hover:bg-sage hover:text-black hover:font-bold'
                                            type='submit'
                                            disabled={isSubmitting}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='text-center font-fira'>
                        <p>
                            Already a user?
                            <button className='m-1 bg-sage py-2 px-1 rounded hover:bg-lightcho'>
                                <Link to='/login'>Log In! </Link>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
