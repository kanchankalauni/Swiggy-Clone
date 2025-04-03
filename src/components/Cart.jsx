import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'

function Cart() {
    const {cartData, setCartData} = useContext(CartContext)
    console.log(cartData)
  return (
    <div className='w-[70%]'>
        <div className='w-[50%] bg-red-200 mx-auto'>
            {
                cartData.map((data) => (
                    <div className='flex justify-between my-5 p-2'>
                        <h2>{data.name}</h2>
                        <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Cart