import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext } from 'react'

export let wishListContext = createContext()

export default function WishListContextProvider({children}) {
    

    const baseURL = 'https://ecommerce.routemisr.com/api/v1/wishlist'
    const headerOptions = {
        headers : {
            token : localStorage.getItem('token'),
        }
    }

    let query = useQuery({
        queryKey : ["getWishlist"] ,
        queryFn : async function(){
            return axios.get(baseURL,headerOptions)
        },
    })

    function getWishlist (){
        return query
    }

    function addtoWishlist (id){

        let data = {
            productId : id ,
        }

        return axios.post(baseURL , data , headerOptions);
    }

    function deleteFromWishlist (id){
        return axios.delete(`${baseURL}/${id}` , headerOptions);
    }


  return (
    <wishListContext.Provider value = {{getWishlist , addtoWishlist , deleteFromWishlist}}>{children}</wishListContext.Provider>
  )
}
