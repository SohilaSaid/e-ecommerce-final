
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {authContext} from '../context/AuthContextPovider.jsx'

export default function LogIn() {

  let initialValues = {
    email:"",
    password:""
}

let navlink = useNavigate()
let{setToken}=useContext(authContext)
let [errorMassage,setError]=useState(null)
async function loginAPI (data){
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  .then((res)=>{
    if(res.data.message=="success"){
      setToken(res.data.token)
      localStorage.setItem('token',res.data.token)
      console.log(res.data.token)
      navlink('/')
    }
  })
  .catch((err)=>{
    setError(err.response.data.message)
    console.log(err.response.data.message)

  })
  console.log (data)

}

let validform = Yup.object({
  email:Yup.string().email().required(),
  password: Yup.string().required('*required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
})



  let loginForm = useFormik({
    initialValues,
    onSubmit: loginAPI,
    validationSchema:validform
  })
  
  return (
   <>
    {errorMassage?<div className="p-4 mb-4 w-2/3 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
    {errorMassage}
    </div>:""}
   <form className="w-7/12 mx-auto mb-10 mt-28" onSubmit={loginForm.handleSubmit}>
       
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            name='email'
            type="email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
            {loginForm.errors.email && loginForm.touched.email?<p className='text-red-600'>{loginForm.errors.email}</p>:""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            name='password'
            type="password"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {loginForm.errors.password && loginForm.touched.password?<p className='text-red-700'>{loginForm.errors.password}</p>:""}
        </div>
        <Link to='/ForgetPassword' className='text-red-600 block mb-3'>forget password ?</Link>
    
        <button type="submit" className="text-white bg-main disabled:bg-opacity-30 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={!(loginForm.isValid && loginForm.dirty)} >Login</button>
      </form>

   </>
  )
}
