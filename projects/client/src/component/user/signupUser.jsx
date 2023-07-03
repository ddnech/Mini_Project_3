import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function SignupUser() {
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

    const pwdRgx = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        storeName: Yup.string().required("Store name is required"),
        email: Yup.string().email('Please use a valid email format').required('Email is required'),
        phone: Yup.string().required('Phone is required').matches(validRgx, "Phone number is not valid"),
        address: Yup.string().required("Address is required"),
        password: Yup.string().matches(pwdRgx, 'At least 8 characters, 1 symbol, 1 capital letter, and 1 number'
        ).required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const response = await axios.post('https://localhost:8000/api/auth/register', values);

            if (response.status === 200) {
                resetForm();
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
        <div className='grid justify-center mt-3'>
            <div className='w-screen grid grid-flow-row justify-center'>
                <div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, status }) => (
                            <Form>
                                <div className='grid grid-flow-row gap-1 justify-center'>
                                    <h3 className='w-72 text-l text-center font-josefin mt-4 text-jetblack tracking-wide font-semibold'>Sign Up</h3>
                                    <h3 className='text-xs text-center font-josefin mb-4 text-jetblack tracking-wide'>Please fill in the information below:</h3>
                                    <div className='w-full grid grid-flow-row gap-3'>
                                        {status && status.success && (
                                            <p className="text-center text-greenn">{status.message}</p>
                                        )}
                                        <div>

                                            <ErrorMessage name='username' component='div' className='text-redd text-xs' />
                                            <Field className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa' type='text' name='username' placeholder='Username' />
                                        </div>
                                        <div>

                                            <ErrorMessage name='storeName' component='div' className='text-redd text-xs' />
                                            <Field className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa' type='text' name='storeName' placeholder='Store Name' />
                                        </div>
                                        <div>
                                            <ErrorMessage name='email' component='div' className='text-redd text-xs' />
                                            <Field className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa' type='email' name='email' placeholder='Email' />
                                        </div>
                                        <div>
                                            <ErrorMessage name='phone' component='div' className='text-redd text-xs' />
                                            <Field className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa' type='text' name='phone' placeholder='Phone' />
                                        </div>
                                        <div>
                                            <ErrorMessage name='address' component='div' className='text-redd text-xs' />
                                            <Field className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa' type='text' name='address' placeholder='Address' />
                                        </div>
                                        <ErrorMessage name='password' component='div' className='text-redd text-xs' />
                                        <Field
                                            className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa'
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            placeholder='Password'
                                        />
                                        <div>
                                            <ErrorMessage name='confirmPassword' component='div' className='text-redd text-xs' />
                                            <Field
                                                className='border border-gray-300 h-6 text-xs w-full mt-2 font-ysa'
                                                type={showPassword ? 'text' : 'password'}
                                                name='confirmPassword'
                                                placeholder='Confirm Password'
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-flow-col justify-start'>
                                        <button type='password' onClick={togglePassword} className='border-none'>{showPassword ? <AiOutlineEye size={15} /> : <AiOutlineEyeInvisible size={15} />}</button>
                                    </div>
                                    <button
                                        className='w-full py-2 my-4 text-xs font-chivo tracking-widest border bg-darkgreen text-flashwhite hover:bg-white hover:text-darkgreen hover:border-darkgreen'
                                        type='submit'
                                        disabled={isSubmitting}
                                    >
                                        Create My Account
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='text-center text-xs font-chivo tracking-wider mb-6'>
                    <p>
                        Already a user?
                        <button className='m-1'>
                            <span className='p-1 hover:border-b-2 hover:border-darkgreen tracking-wide'><Link to='/login'>Log In!</Link></span>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}