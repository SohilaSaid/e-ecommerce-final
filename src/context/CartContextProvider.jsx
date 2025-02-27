import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export let cartContext = createContext ()
export default function CartContextProvider({children}) {
    const baseURL = 'https://ecommerce.routemisr.com/api/v1/cart'
    const headerOptions = {
        headers : {
            token : localStorage.getItem('token'),
        }
    }

    let [cartNum , setCartNum] = useState(null)
   
    let query = useQuery({
        queryKey : ["getcart"] ,
        queryFn : async function(){
            return axios.get(baseURL,headerOptions)
        },
    })

    useEffect (()=>{
        setCartNum(query?.data?.data?.numOfCartItems)
    } , [query?.data?.data?.numOfCartItems])

    console.log(query?.data?.data?.numOfCartItems)

    function getCart (){
        return query
    }

    function addToCart (id){

        let data = {
            productId : id ,
        }

        return axios.post(baseURL , data , headerOptions);
    }

    function deleteItem (id){
        return axios.delete(`${baseURL}/${id}` , headerOptions);
    }

    function clearCart (){
        return axios.delete(baseURL , headerOptions);
    }

    function updateCart (id,count){
        let data = {
            count : count ,
        }

        return axios.put (`${baseURL}/${id}` , data  , headerOptions);
    }



  return (
    <cartContext.Provider value={{getCart , cartNum , setCartNum , addToCart , deleteItem , clearCart , updateCart }}>{children}</cartContext.Provider>
  )
}



