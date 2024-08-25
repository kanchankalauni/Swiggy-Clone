import React from 'react'

function Head() {
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
            <div className='flex items-center gap-12'>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-ss-briefcase"></i>
                    <p>Swiggy Corporate</p>
                </div>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-rr-search"></i>
                    <p>Search</p>
                </div>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-rs-badge-percent"></i>
                    <p>Offers</p>
                </div>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-rr-exclamation"></i>
                    <p>Help</p>
                </div>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-bs-user"></i>
                    <p>Sign in</p>
                </div>
                <div className='flex items-center gap-2'>
                    <i class="fi fi-rr-shopping-cart"></i>
                    <p>Cart</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Head