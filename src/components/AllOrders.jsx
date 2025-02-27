import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AllOrders() {

  let [orders, setOrders] = useState([]);

  async function OrdersAPI (){
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/")
   }

  

    useEffect(() => {
      OrdersAPI().then( (res)=>{
            console.log(res.data.data)
            setOrders(res.data.data)
            console.log(orders)
            
          })
      
        
            
    }, []);

  
  return (
    <>
    <h2 className='mt-28 text-center text-main font-bold text-2xl '>AllOrders</h2>

    {orders?.map((cart, i )=>{
      
      return  <div key={cart.id} className="container mx-auto mt-10">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Card ID</th>
            <th className="border p-3">Order Price</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          
            <tr className="text-center border">
              <td className="border p-3 font-bold">#{cart.id}</td>
              <td className="border p-3">{cart.totalOrderPrice}EGP</td>
              <td className="border p-3 flex justify-center items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded">{cart.isPaid?'paid': 'notpaid'}</span>
               
                <span className="bg-red-500 text-white px-2 py-1 rounded">{cart.isDelivered?"Delivered":"inDelivered"}</span>
                
              </td>
              <td className="border p-3">
                <Link to={`/specificcartorder/${cart.user._id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View</button>
                </Link>
              </td> 
            </tr>
          
        </tbody>
      </table>
    </div>
    })}





   

    </>
  )
}

