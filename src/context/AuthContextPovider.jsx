import React, { createContext, useEffect, useState } from 'react'


export let authContext = createContext();

export default function AuthContextPovider({children}) {
    let[token,setToken] = useState(null)
   useEffect(()=>{
    let tokenStorage = localStorage.getItem("token")
    console.log(tokenStorage);
    
    if(tokenStorage)
      setToken(tokenStorage)
   },[])
  return (
    <authContext.Provider value={{token,setToken}}>
        {children}
    </authContext.Provider>
  )
}
