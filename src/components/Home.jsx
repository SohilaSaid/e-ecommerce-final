
import axios from 'axios'
import React, { useContext , useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import HomeSlider from '../slider/HomeSlider'
import CategorySlider from '../slider/CategorySlider'
import {cartContext } from '../context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { wishListContext } from '../context/WishListContextProvider'

export default function Home() {


  let [numsList, setNumsList] = useState("1")
  let [favorite , setFavorite] = useState(false)

  let{addToCart , setCartNum } = useContext(cartContext)
  let {addtoWishlist} = useContext(wishListContext)

  

  function productaAPI() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${numsList}`)
  }

  let { data, error, isError, isLoading ,refetch } = useQuery({
    queryKey: ["product", numsList],
    queryFn: productaAPI,
  })

  function pageNum(e) {
    let page = e.target.getAttribute('page')
    console.log(e.target)
    setNumsList(page)
  }

  function add (id){
    addToCart(id).then((res)=>{
      console.log (res)
      setCartNum(res.data.numOfCartItems)
      refetch()
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
      setFavorite(!favorite)
      refetch()
      toast.success(res.data.message)
      
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })

  }







  

  if (isError) {
    return <h2 className='text-red-600'>{error.response.data.massage}</h2>
  }

  return (

    <>
    <Toaster/>
      {isLoading ? <div className='flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div> : <div className='container w-11/12 mx-auto mt-28 mb-5'>

      <HomeSlider/>
      <CategorySlider/>

      <input type="search" onClick={()=>{search(e)}}  class="lg:w-2/3 sm:w-full mx-auto block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-main focus:border-main " placeholder="Search"  />
        
        <div className='flex flex-wrap mt-5'>
          {data?.data?.data?.map((product) => {
            let { id, title, price, imageCover, category, ratingsAverage } = product
            let { name } = category

            return (
              <div key={id}
                className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full p-2  ' >
                
                  <div className="item overflow-hidden group hover:border border-main hover:shadow-2xl p-2">
                  <Link to={"/productdetails/" + id}>
                    <img src={imageCover} className='w-full' alt={title}></img>
                    <h5 className='text-main'>{name}</h5>
                    <h2 className='text-2xl'> {title.split(" ").slice(0, 2).join(' ')} </h2>
                    <div className='flex justify-between'>
                      <span>{price}EGP</span>
                      <span>
                        <i className="fa-solid fa-star text-yellow-400 text-xs">{ratingsAverage}3.4</i>
                      </span>
                    </div>
                    </Link>
                    <button onClick={()=>{addWishList(id)}}><i className={`fa-solid fa-heart   ${ favorite ? "text-red-500" : "text-gray-500"}`} ></i></button>
                    <button onClick={()=>{add(id)}} className='bg-main text-white text-center  mt-3 p-1 translate-y-10 duration-500 w-full rounded hover:bg-green-600 group-hover:translate-y-0'>Add to card</button>
                  </div>
                
              </div>

            )
          })}

        </div>



        <nav aria-label="Page navigation example">
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            <li>
              <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                </svg>
              </a>
            </li>

          

            {new Array(data?.data?.metadata?.numberOfPages).fill("").map((el, i) => {
              return <li key={el} onClick={pageNum} >
                <a page={i + 1} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{i + 1}</a>
              </li>
            })}


            <li onClick={pageNum}>
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>

      </div>}
    </>
  )
}



