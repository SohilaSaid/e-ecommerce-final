
import React, { useContext } from 'react'
import { cartContext } from '../context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

    let { getCart, deleteItem, clearCart, updateCart, setCartNum } = useContext(cartContext)
    let { isError, isLoading, data, error, refetch } = getCart()
    getCart().refetch()

    let cartData = data?.data?.data
    console.log(cartData)

    function deleteitemCart(id) {
        deleteItem(id)
            .then((res) => {
                console.log(res)
                setCartNum(res.data.numOfCartItems)
                refetch()
                toast.success("Product Deleted")
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })

    }


    function clear() {
        clearCart()
            .then((res) => {
                console.log(res)
                setCartNum(res.data.numOfCartItems)
                refetch()
                toast.success("Cart Cleared")
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })

    }

    function update(id , count) {
        updateCart(id ,count)
            .then((res) => {
                console.log(res)
                refetch()
            })
            .catch((err) => {
                console.log(err)
                
            })

    }


    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading"></span>
        </div>
    }

    if (isError) {
        return <h2>{error?.response?.data?.message}</h2>
    }
    return (
        <>
            <Toaster />

            {cartData.products.length > 0 ?

                <div className='w-10/12 mx-auto mb-10 mt-28 '>
                    <div className='bg-gray-50 p-10 rounded '>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-bold py-3'>Cart Shop</h1>
                           <Link to={'/chackout/'+ data?.data.cartId}>
                           <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Check our Cart</button>
                           </Link>
                        </div>
                        <div className='flex justify-between'>
                            <h2 className='font-bold'>Total Cart Price : <span className='text-main'>{cartData.totalCartPrice}</span> </h2>
                            <h2 className='font-bold'>Total number of items : <span className='text-main'>{data?.data.numOfCartItems}</span> </h2>
                        </div>

                        <div className='divide-y-2 divide-gray-200'>


                            {cartData.products.map((product) => {
                                
                                return <div key={product._id} className='flex items-center '>

                                    <div className='w-10/12 my-5'>
                                        <div className='flex justify-between'>
                                            <div className='w-2/12'>
                                                <img src={product.product.imageCover} className='w-full' alt='image'></img>
                                            </div>

                                            <div className='w-9/12'>
                                                <h2 className='font-bold'> {product.product.title}</h2>
                                                <h2 className='font-bold'> {product.price}</h2>
                                                <button onClick={() => { deleteitemCart(product.product._id) }} className=' my-2 p-2  text-red-600'><i className="fa-solid fa-trash-can"></i> Remove</button>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='w-2/12'>

                                        <i onClick={()=>{update(product.product._id,product.count+=1)}} className="fa-solid cursor-pointer fa-plus rounded text-main border p-2 border-main"></i>
                                        <span className='mx-2'>{product.count}</span>
                                        <i  onClick={()=>{update(product.product._id, product.count-=1)}}className="fa-solid cursor-pointer fa-minus rounded text-main border p-2 border-main"></i>
                                    </div>
                                </div>
                            })}
                            <div className="flex justify-center my-5 ">
                                <button onClick={clear} type="button" className="py-2.5 px-5 my-5 text-xl font-medium text-gray-900  bg-transparent rounded-xl border border-main  ">Clear Your Cart</button>
                            </div>




                        </div>
                    </div>
                </div> :
                <>
                    <div className='w-10/12 mx-auto  mt-28 '>
                        <div className='bg-gray-50 p-10 rounded'>
                            <div className='flex justify-between'>
                                <h1 className='text-2xl font-bold py-3'>Cart Shop</h1>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg  px-4 me-2 mb-2 font-bold ">Check out</button>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Total Cart Price : <span className='text-main'>0 EGP</span> </h2>
                                <h2 className='font-bold'>Total number of items : <span className='text-main'>0</span> </h2>
                            </div>

                        </div>

                        <div className="flex justify-center my-5 ">
                        <button type="button" className="py-2.5 px-5 my-5 text-xl font-medium text-gray-900  bg-transparent rounded-xl border border-main  ">Clear Your Cart</button>
                        </div>
                    </div>
                </>

            }

        </>

    )
}

