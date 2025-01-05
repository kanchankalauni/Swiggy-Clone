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

    const [visible, setVisible] = useState(true)


    function handleVisibility() {
        setVisible(prev => !prev)
    }

  return (
    <div className='relative w-full'>
        
        <div>
            <div onClick={handleVisibility} className={'w-full bg-black/50 h-full absolute z-30 ' + (visible ? "visible" : " invisible")}></div>
            <div className={'bg-white w-[40%] h-full z-40 absolute duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
                <p className='bg-black text-white p-5 w-[10%]' onClick={handleVisibility}>cut</p>
            </div>
        </div>

        <div className='w-full sticky bg-white z-20 top-0 shadow-md h-20 flex justify-center items-center'>
            <div className='flex justify-around w-[80%]'>
                <div className='flex items-center'>
                    <Link to={"/"}>
                        <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="Swiggy Logo" />
                    </Link>
                    <div className='flex items-center gap-2' onClick={handleVisibility}>
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