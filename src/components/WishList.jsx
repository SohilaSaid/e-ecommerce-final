import React, { useContext } from 'react'
import { wishListContext } from '../context/WishListContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { cartContext } from '../context/CartContextProvider'


export default function WishList() {

  let { getWishlist, deleteFromWishlist } = useContext(wishListContext)
  let { addToCart, setCartNum } = useContext(cartContext)
  let { isError, isLoading, data, error, refetch } = getWishlist()

  let wishList = data?.data?.data
  console.log(wishList)


  function deleteitemWishlist(id) {
    deleteFromWishlist(id)
      .then((res) => {
        console.log(res)
        refetch()
        toast.success("Product Deleted")
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
      })

  }

  function add(id) {
    addToCart(id).then((res) => {
      console.log(res)
      setCartNum(res.data.numOfCartItems)
      refetch()
      toast.success(res.data.message)
    })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
      })

  }








  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loading"></span>
    </div>
  }

  // if (isError) {
  //   return <h2>{error?.response?.data?.message}</h2>
  // }
  return (
    <>
      <Toaster />



      <div className='w-10/12 mx-auto mb-10 mt-28'>
        <div className='bg-gray-50 p-10 rounded'>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold py-3'>My Wish list</h1>

          </div>


          {wishList?.map((product) => {
            return <div key={product._id} className='divide-y-2 divide-gray-200'>


              <div className='flex items-center '>

                <div className='w-10/12 my-5'>
                  <div className='flex justify-between'>
                    <div className='w-2/12'>
                      <img src={product.imageCover} className='w-full' alt=''></img>
                    </div>

                    <div className='w-9/12'>
                      <h2 className='font-bold'>{product.title} </h2>
                      <h2 className='font-bold text-main'>{product.price}</h2>
                      <button onClick={() => { deleteitemWishlist(product._id) }} className=' my-2 p-2  text-red-600'><i class="fa-solid fa-trash-can"></i> Remove</button>
                    </div>
                  </div>


                </div>

                <div className='w-2/12'>

                  <button type="button" onClick={() => { add(product._id) }} class="py-2.5 px-5 my-5 text-xl font-medium text-gray-900  bg-transparent rounded-xl border border-main  ">add to cart</button>
                </div>
              </div>






            </div>
          })}
        </div>
      </div>



    </>
  )
}
