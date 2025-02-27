import React from 'react'
import LogIn from './LogIn'
import { Navigate } from 'react-router-dom'

export default function ProductRouting({children}) {
    if (localStorage.getItem("token")){
        return children
    } else {
        return <Navigate to={<LogIn/>}></Navigate>
    }
}
