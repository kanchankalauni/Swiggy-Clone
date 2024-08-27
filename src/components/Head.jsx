import React from 'react'

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

  return (
    <div className='w-full shadow-md h-20 flex justify-center items-center'>
        <div className='flex justify-around w-[80%]'>
            <div className='flex items-center'>
                <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="Swiggy Logo" />
                <div className='flex items-center gap-2'>
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
  )
}

export default Head