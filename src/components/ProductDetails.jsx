
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { cartContext } from '../context/CartContextProvider'
import { useContext } from 'react'
import { wishListContext } from '../context/WishListContextProvider'

export default function ProductDetails() {
  let { id } = useParams()
   let{addToCart , setCartNum } = useContext(cartContext)
   let {addtoWishlist} = useContext(wishListContext)
 
 function detailsAPI (){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

 }

  let{data,isLoading} = useQuery({
    queryKey:["productDetails",id],
    queryFn:detailsAPI,
  })

  function add (id){
    addToCart(id).then((res)=>{
      console.log (res)
      setCartNum(res.data.numOfCartItems)
      toast.success(res.data.message)
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })

  }

  function addWishList (id){
    addtoWishlist(id).then((res)=>{
      console.log (res)
      toast.success(res.data.message)
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })

  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
    <Toaster/>
      {isLoading ? <div className='flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div> :
        <div className='w-10/12 mx-auto mb-5 mt-28'>
          <div className='flex justify-between items-center'>
            <div className='w-3/12'>  

              <Slider {...settings}>
                {data?.data?.data?.images.map((img,i)=>{
                  return(
                    <div key={i}>
                      <img src={img} className='w-full'></img>
                    </div>
                  )

                })}
              </Slider>
              
            </div>
            <div className='w-8/12'>
              <h2>{data?.data?.data?.title}</h2>
              <p className=' my-5'>{data?.data?.data?.description}</p>

              <div className='flex justify-between'>
                <span>{data?.data?.data?.price}EGP</span>
                <span>
                  <i className="fa-solid fa-star text-yellow-400 text-xs">{data?.data?.data?.ratingsAverage}3.4</i>
                </span>
              </div>
              <button onClick={()=>{addWishList(id)}}><i class="fa-solid fa-heart"></i></button>
              <button onClick={()=>{add(id)}} className='bg-main text-white text-center  mt-3 p-1  w-full rounded hover:bg-green-600 '>Add to card</button>

            </div>

          </div>
        </div>}
    </>
  )
}
