import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SpecificCartOrder() {
    let {id} = useParams()

    let [order, setCartOrder] = useState([]);

    async function OrderAPI() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }

    // let specificOrder = order.find((cart) => cart._id === id);
    // console.log(specificOrder)
    useEffect(() => {
        OrderAPI().then((res) => {
            // console.log(id)
            console.log(res)
            // setCartOrder(res.data)
            // console.log(order)
           
        
})



    }, []);





  












    return (
        <div className="bg-gray-100 min-h-screen p-6 mt-28">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-lg font-semibold">Order ID: <span className="text-green-600">#40756</span></h2>
                    <p className="text-gray-700">Total Payment Price: <span className="text-green-600 font-semibold">1811 EGP</span></p>
                    <p className="text-gray-700">Payment Method: <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Card</span></p>
                    <p className="text-gray-500">Tuesday 11 February, 2025</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
                    <div>
                        <h3 className="font-semibold">Address Info</h3>
                        <p className="text-gray-500">Address Details: </p>
                        <p className="text-gray-500">City:</p>
                        <p className="text-gray-500">Phone:</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Customer Info</h3>
                        <p className="text-gray-700">Name: </p>
                        <p className="text-gray-700">Email: </p>
                        <p className="text-gray-700">Phone: </p>
                    </div>
                </div>

                <table className="w-full border-collapse border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-2 flex items-center"><img src="/shawl1.jpg" alt="" className="w-10 h-10 mr-2" /> Woman</td>
                            <td className="p-2 text-center">149 EGP</td>
                            <td className="p-2 text-center">2</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 flex items-center"><img src="/shawl2.jpg" alt="" className="w-10 h-10 mr-2" /> Woman</td>
                            <td className="p-2 text-center">190 EGP</td>
                            <td className="p-2 text-center">3</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 flex items-center"><img src="/socks.jpg" alt="" className="w-10 h-10 mr-2" /> Woman</td>
                            <td className="p-2 text-center">199 EGP</td>
                            <td className="p-2 text-center">1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
