import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function SignUp() {

  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  let [errorMassage, setError] = useState(null)
  let navLink = useNavigate()
  async function regsiterAbi(data) {
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
      .then((res) => {
        if (res.data.message == "success") {
          navLink('/login')

        }
        console.log(res)
      })
      .catch((err) => {
        setError(err.response.data.message)
        console.log(err.response.data.message)
      })
    console.log(data)

  }


  let validYup = Yup.object({
    name: Yup.string().required('*required').min(3, '*min lenght 3').max(7, '*max lenght 7'),
    email: Yup.string().required('*required').email('*must have @ .com'),
    password: Yup.string().required('*required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'not match'),
    phone: Yup.string().required().matches(/^(20)?01[1250][0-9]{8}$/, 'enter valid number')
  })




  let regsiterForm = useFormik({
    initialValues,
    onSubmit: regsiterAbi,
    validationSchema: validYup,
  })




  return (
    <>

      {errorMassage ? <div className="p-4 mb-4 w-2/3 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        {errorMassage}
      </div> : ""}




      <form className="w-7/12 mx-auto mt-28 mb-10" onSubmit={regsiterForm.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            name='name'
            value={regsiterForm.values.name}
            onChange={regsiterForm.handleChange}
            onBlur={regsiterForm.handleBlur}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
          {regsiterForm.touched.name && regsiterForm.errors.name ? <p className='text-red-700'>{regsiterForm.errors.name}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            name='email'
            value={regsiterForm.values.email}
            onChange={regsiterForm.handleChange}
            onBlur={regsiterForm.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {regsiterForm.touched.email && regsiterForm.errors.email ? <p className='text-red-700'>{regsiterForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            name='password'
            value={regsiterForm.values.password}
            onChange={regsiterForm.handleChange}
            onBlur={regsiterForm.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {regsiterForm.touched.password && regsiterForm.errors.password ? <p className='text-red-700'>{regsiterForm.errors.password}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">rePassword</label>
          <input
            name='rePassword'
            value={regsiterForm.values.rePassword}
            onChange={regsiterForm.handleChange}
            onBlur={regsiterForm.handleBlur}
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {regsiterForm.touched.rePassword && regsiterForm.errors.rePassword ? <p className='text-red-700'>{regsiterForm.errors.rePassword}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
          <input
            name='phone'
            value={regsiterForm.values.phone}
            onChange={regsiterForm.handleChange}
            onBlur={regsiterForm.handleBlur}
            type="tel"
            id="tel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {regsiterForm.touched.phone && regsiterForm.errors.phone ? <p className='text-red-700'>{regsiterForm.errors.phone}</p> : ""}
        </div>

        <button type="submit" className="text-white bg-main disabled:bg-opacity-30 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={!(regsiterForm.isValid && regsiterForm.dirty)} >Submit</button>
      </form>

    </>
  )
}
