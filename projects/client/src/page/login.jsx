import React from 'react';
import { useDispatch } from "react-redux";
import { keep } from '../store/reducer/authSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { VscEye } from "react-icons/vsc";
import { Modal, Button } from "flowbite-react";

export default function LogIn() {
    // const dispatch = useDispatch();

    // const [showPassword, setShowPassword] = useState(false);

    // const togglePassword = (e) => {
    //     e.preventDefault();
    //     setShowPassword(!showPassword);
    // };

    // const initialValues = {
    //     username: '',
    //     password: '',
    // };

    // const validationSchema = Yup.object().shape({
    //     username: Yup.string().required('Username is required'),
    //     password: Yup.string().required('Password is required'),
    // });

    // const navigate = useNavigate()

    // const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm, setStatus }) => {
    //     try {

    //         const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/login', values);

    //         if (response.status === 200) {
    //             const token = response.data.token;
    //             localStorage.setItem("token", token);
    //             dispatch(keep(token));
    //             const likeResponse = await LikePostUser(token)
    //             dispatch(postLike(likeResponse.data));
    //             resetForm();
    //             setStatus({ success: true, token });
    //             navigate("/homeuser")
    //         } else {
    //             throw new Error('Login Failed');
    //         }
    //     } catch (error) {
    //         alert(error)
    //         setFieldError('username', 'Incorrect Username!');
    //         setFieldError('password', 'Incorrect Password!');
    //         setStatus({ success: false, token: " " });
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // //forget password modal
    // const [modalOpen, setModalOpen] = useState(false);
    // const [email, setEmail] = useState("");

    // const initialValuesEmail = {
    //     email: '',
    // };

    // const validationSchemaEmail = Yup.object().shape({
    //     email: Yup.string().email('Format is not acceptable').required('Email is required'),
    // });

    // const handleToggleModal = () => {
    //     setModalOpen(!modalOpen);
    // };

    // const handleCloseModal = () => {
    //     setModalOpen(false);
    // };

    // const handleEmail = (input) => {
    //     setEmail(input);
    // };

    // const handleSave = (event) => {
    //     event.preventDefault();
    //     axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", { "email": email })
    //         .then(() => alert("success!"))
    //         .catch((err) => alert(err))
    // };


    // return (
    //     <div className='w-screen h-screen grid content-center justify-center'>
    //         <div className='w-[28rem] h-[36rem] grid grid-flow-row rounded overflow-hidden shadow-2xl'>
    //             <div className='bg-header w-full h-32 object-cover bg-no-repeat bg-center bg-cover grid'>
    //                 <div className='font-monts font-bold text-6xl text-center text-ivory drop-shadow-5xl m-6'>
    //                     COZY
    //                 </div>
    //             </div>
    //             <div className='h-[27rem]'>
    //                 <div>
    //                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
    //                         {({ isSubmitting }) => (
    //                             <Form>
    //                                 <div className='grid grid-flow-row gap-1 justify-center'>
    //                                     <h3 className='font-monts font-bold text-xl text-center text-darkcho m-4'>WELCOME BACK!</h3>
    //                                     <div className=' grid grid-flow-row gap-3 w-60'>
    //                                         <ErrorMessage name='username' component='div' className='text-red-500 text-xs' />
    //                                         <Field
    //                                             className='border-none h-6'
    //                                             type='text'
    //                                             name='username'
    //                                             placeholder='Username'
    //                                         />
    //                                         <ErrorMessage name='password' component='div' className='text-red-500 text-xs' />
    //                                         <Field
    //                                             className='border-none h-6'
    //                                             type={showPassword ? 'text' : 'password'}
    //                                             name='password'
    //                                             placeholder='Password'
    //                                         />
    //                                     </div>
    //                                     <div className='grid grid-flow-col justify-start'>
    //                                         <button onClick={togglePassword} className='m-1'><span className='flex content-center h-5'><VscEye className='m-1' />Show Password</span></button>
    //                                     </div>
    //                                     <div>
    //                                         <button
    //                                             className='w-full py-2 my-4 bg-olive text-ivory hover:bg-sage hover:text-black hover:font-bold'
    //                                             type='submit'
    //                                             disabled={isSubmitting}
    //                                         >
    //                                             Log In
    //                                         </button>
    //                                     </div>
    //                                 </div>
    //                             </Form>
    //                         )}
    //                     </Formik>
    //                 </div>
    //                 <div className='flex justify-center content-center'>
    //                     <span className='h-10 font-fira text-sm p-1'> Forget Password? </span>
    //                     <Button onClick={handleToggleModal} className="bg-gray-400 hover:bg-olive mx-4" size="xs">
    //                         Click Here!
    //                     </Button>
    //                     <Modal show={modalOpen} size="md" popup={true} onClose={handleCloseModal}>
    //                         <Modal.Header />
    //                         <Modal.Body>
    //                             <Formik initialValues={initialValuesEmail} validationSchema={validationSchemaEmail} onSubmit={handleSave}>
    //                                 <form>
    //                                     <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
    //                                         <h3 className="text-xl font-monts font-medium text-gray-900 dark:text-white">
    //                                             Forget Password
    //                                         </h3>
    //                                         <div>
    //                                             <div>
    //                                                 <label className="font-fira text-sm">Enter your registered email here!</label>
    //                                                 <Field type="text" id="email" name="email" className='border-none h-6 mt-4 rounded' placeholder='john.doe@purwadhika.com' />
    //                                                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
    //                                             </div>
    //                                             <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
    //                                                 <button
    //                                                     className="bg-sage hover:bg-olive text-black hover:text-white hover:font-bold w-14 mr-2 text-center rounded"
    //                                                 >
    //                                                     Save
    //                                                 </button>
    //                                                 <button
    //                                                     onClick={handleCloseModal}
    //                                                     className="bg-sage hover:bg-olive text-black hover:text-white hover:font-bold w-14 text-center rounded"
    //                                                 >
    //                                                     Cancel
    //                                                 </button>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </form>
    //                             </Formik>
    //                         </Modal.Body>
    //                     </Modal>
    //                 </div>
    //                 <div className='text-center font-fira'>
    //                     <p>
    //                         Don't have an account?
    //                         <button className='m-1 bg-sage py-2 px-1 rounded hover:bg-lightcho'><Link to="/signup">Sign Up! </Link></button>
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}