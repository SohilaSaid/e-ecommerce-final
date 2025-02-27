import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'
import { authContext } from '../context/AuthContextPovider'
import {cartContext} from '../context/CartContextProvider'

export default function NavBar() {
    let { token, setToken } = useContext(authContext)
    let nav = useNavigate()
    let{cartNum} = useContext(cartContext)

    function logOut() {
        localStorage.removeItem('token')
        setToken(null)
        nav("/Login")
    }
    return (
        <>
            <nav className="bg-gray-50 border-gray-200 shadow fixed top-0 right-0 left-0 z-50 ">
                <div className="max-w-screen-xl flex  items-center  p-4 ">

                    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo}></img>
                    </Link>

                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>



                    {token ? <div className="hidden w-full md:block md:w-auto mx-10" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4  md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <NavLink to="" className="block py-2 px-3 text-gray-700  rounded md:bg-transparent md:p-0" aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="cart" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0">Cart</NavLink>
                            </li>
                            <li>
                                <NavLink to="products" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0 ">Product</NavLink>
                            </li>
                            <li>
                                <NavLink to="wishlist" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0 ">WishList</NavLink>
                            </li>
                            <li>
                                <NavLink to="categories" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0 ">Categores</NavLink>
                            </li>
                            <li>
                                <NavLink to="brands" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0 ">Brands</NavLink>
                            </li>
                            <li>
                                <NavLink to="allorders" className="block py-2 px-3 text-gray-700 rounded md:border-0  md:p-0 ">All Orders</NavLink>
                            </li>

                        </ul>
                    </div> : ""}




                    <div className="hidden w-full md:block md:w-auto ms-auto" id="navbar-default">

                        <ul className='flex space-x-4'>

                            {token ? <>
                                <li className='text-main relative'>
                                    <i className="fa-solid fa-cart-shopping "></i>
                                    <span className='absolute top-0 right-0 -translate-y-3 translate-x-3'>{cartNum}</span>
                                </li>

                                <li>
                                    <button onClick={logOut} className="block py-2 px-3 text-gray-700 rounded  md:border-0 md:p-0 ">Logout</button>
                                </li>
                            </> : 
                            <>
                                <li>
                                    <NavLink to="signup" className="block py-2 px-3 text-gray-700 rounded  md:border-0 md:p-0 ">Signup</NavLink>
                                </li>
                                <li>
                                    <NavLink to="login" className="block py-2 px-3 text-gray-700 rounded  md:border-0 md:p-0 ">Login</NavLink>
                                </li>
                            </>}




                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}
