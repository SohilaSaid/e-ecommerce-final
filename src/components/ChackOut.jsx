import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChackOut() {
  let { id } = useParams()

  const headerOptions = {
    headers : {
        token : localStorage.getItem('token'),
    }
}

  let checkoutForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkoutSession,
  })

  function checkoutSession(values) {
    console.log(values)

    let body = {
      shippingAddress: values ,
    };

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173` , body , headerOptions )
    .then((res)=>{
      console.log(res)
      window.open(res.data.session.url)
    })

  }
  return (
    <div className='w-7/12 mx-auto mb-5 mt-28'>
      <form onSubmit={checkoutForm.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
          <input
            name='details'
            type="text"
            onChange={checkoutForm.handleChange}
            onBlur={checkoutForm.handleBlur}
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {checkoutForm.errors.details && checkoutForm.touched.details ? <p className='text-red-600'>{checkoutForm.errors.details}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
          <input
            name='phone'
            type="tel"
            onChange={checkoutForm.handleChange}
            onBlur={checkoutForm.handleBlur}
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {checkoutForm.errors.phone && checkoutForm.touched.phone ? <p className='text-red-600'>{checkoutForm.errors.phone}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
          <input
            name='city'
            type="text"
            onChange={checkoutForm.handleChange}
            onBlur={checkoutForm.handleBlur}
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
          {checkoutForm.errors.city && checkoutForm.touched.city ? <p className='text-red-600'>{checkoutForm.errors.city}</p> : ""}
        </div>

        <button class="text-blue-500 block w-full bg-white border border-blue-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-20">Pay Now</button>
      </form>
    </div>
    
  )
}




