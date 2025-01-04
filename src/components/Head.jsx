import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function Head() {

    const navItems = [
        {
            name : "Swiggy Corporate",
            image : "fi-ss-briefcase"
        },
        {
            name : "Search",
            image : "fi-rr-search"
        },
        {
            name : "Offers",
            image : "fi-rr-badge-percent"
        },
        {
            name : "Help",
            image : "fi-rr-exclamation"
        },
        {
            name : "Sign in",
            image : "fi-bs-user"
        },
        {
            name : "Cart",
            image : "fi-rr-shopping-cart"
        }
    ]

    const [visible, setVisible] = useState(false)

    function handleSearchFunctionality() {
        setVisible(prev => !prev)
    }

    function handleVisibility() {
        setVisible(prev => !prev)
    }

  return (
    <div className='relative'>
        
        {
            visible && <div className='w-full bg-black/50 h-full absolute z-50'>
                <p className='text-black bg-white p-10 w-5 text-center' onClick={handleVisibility}>cut</p>
            </div>
        }

        <div className='w-full shadow-md h-20 flex justify-center items-center'>
            <div className='flex justify-around w-[80%]'>
                <div className='flex items-center'>
                    <Link to={"/"}>
                        <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="Swiggy Logo" />
                    </Link>
                    <div className='flex items-center gap-2' onClick={handleSearchFunctionality}>
                        <p className='font-bold border-b-2 border-black'>Other</p>
                        <i className="text-2xl text-orange-500 fi fi-rs-angle-small-down"></i>
                    </div>
                </div>
                <div className='flex items-center gap-14'>
                    {
                        navItems.map((data) => (
                            <div className='flex items-center gap-3'>
                                <i className={`mt-1 text-xl text-gray-700 fi ` + data.image}></i>
                                <p className='text-lg font-medium text-gray-700'>{data.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        <Outlet/>
    </div>
  )
}

export default Head