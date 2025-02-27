import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function VerifyCodePass() {


    let initialValues = {
        resetCode: ''
    }

    let validVerify = Yup.object({
        resetCode: Yup.string().required()
    })
    let [errorMassage, setError] = useState(null)
    let navg = useNavigate('')

    async function verifyAPI(data) {
        console.log(data)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)
            .then((res)=>{
                if(res.data.status=="Success"){
                    navg('/updatePass')
                }
                console.log(res)
            })
            .catch((err) => {
                setError(err.response.data.message)
                console.log(err.response.data.message)

            })
        console.log(data)
    }



    let verifyForm = useFormik({
        initialValues,
        onSubmit: verifyAPI,
        validationSchema: validVerify,
    })
    return (
        <>
            {errorMassage ? <div className="p-4 mb-4 w-2/3 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {errorMassage}
            </div> : ""}
            <form className="w-7/12 mx-auto mt-28 mb-10" onSubmit={verifyForm.handleSubmit}>

                <div className="mb-5">
                    <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900">ResetCode</label>
                    <input
                        name='resetCode'
                        type="string"
                        id="resetCode"
                        value={verifyForm.values.resetCode}
                        onChange={verifyForm.handleChange}
                        onBlur={verifyForm.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d" required />
                    {verifyForm.errors.resetCode && verifyForm.touched.resetCode ? <p className='text-red-600'>{verifyForm.errors.resetCode}</p> : ""}
                </div>



                <button type="submit" className="text-white bg-main disabled:bg-opacity-30 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"   >Send</button>
            </form></>

    )
}
