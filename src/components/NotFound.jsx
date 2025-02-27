import React from 'react'
import errImg from "../assets/images/error.svg"

export default function NotFound() {
  return (
    <div className='flex justify-center items-center mt-28' >
    <img src={errImg} alt='error'></img>
    </div>
  )
}
