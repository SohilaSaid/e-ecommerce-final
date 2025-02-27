import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {
    let initialValues = {
        email: ""
    }

    let validPass = Yup.object({
        email: Yup.string().required().email('*must have @ .com')
    })

    let [errorMassage, setError] = useState(null)
    let navg = useNavigate("")

    async function paswordAPI(data) {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
            .then((res) => {
                navg('/verifyCodePass')
                console.log(res.data.message)
            })
            .catch((err) => {
                setError(err.data.message)
            })
        console.log(data)
    }

    let paswordForm = useFormik({
        initialValues,
        onSubmit: paswordAPI,
        validationSchema: validPass,
    })
    return (
        <>
            {errorMassage ? <div className="p-4 mb-4 mt-28 w-2/3 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {errorMassage}
            </div> : ""}

            <form className="w-7/12 mx-auto my-10" onSubmit={paswordForm.handleSubmit} >

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                        name='email'
                        type="email"
                        value={paswordForm.values.email}
                        onChange={paswordForm.handleChange}
                        onBlur={paswordForm.handleBlur}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
                    {paswordForm.errors.email && paswordForm.touched.email ? <p className='text-red-600'>{paswordForm.errors.email}</p> : ""}
                </div>



                <button type="submit" className="text-white bg-main disabled:bg-opacity-30 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={!(paswordForm.isValid && paswordForm.dirty)}  >Send</button>
            </form>

        </>
    )
}
