import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function UpdatePass() {

  let initialValues = {
    email:"",
    newPassword:""
}

let navlink = useNavigate()
let [errorMassage,setError]=useState(null)
async function UpdateAPI (data){
  await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  .then((res)=>{
    console.log(res)
    if (res.data.token){
      navlink('/login')
    }
   
  })
  .catch((err)=>{
    setError(err.response.data.message)
    console.log(err.response.data.message)

  })
  console.log (data)

}

let updateValid = Yup.object({
  email:Yup.string().email().required(),
  newPassword: Yup.string().required('*required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
})



  let updateForm = useFormik({
    initialValues,
    onSubmit: UpdateAPI,
    validationSchema:updateValid
  })
  
  return (
   <>
    {errorMassage?<div className="p-4 my-4 w-2/3 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
    {errorMassage}
    </div>:""}
   <form className="w-7/12 mx-auto mt-28 mb-10" onSubmit={updateForm.handleSubmit}>
       
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            name='email'
            type="email"
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
            {updateForm.errors.email && updateForm.touched.email?<p className='text-red-600'>{updateForm.errors.email}</p>:""}
        </div>
        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
          <input
            name='newPassword'
            type="password"
            onChange={updateForm.handleChange}
            onBlur={updateForm.handleBlur}
            id="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {updateForm.errors.newPassword && updateForm.touched.password?<p className='text-red-700'>{updateForm.errors.newPassword}</p>:""}
        </div>
        
    
        <button type="submit" className="text-white bg-main disabled:bg-opacity-30 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={!(updateForm.isValid && updateForm.dirty)} >Update password</button>
      </form>

   </>
  )
}
