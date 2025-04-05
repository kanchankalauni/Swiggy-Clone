import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'
import { Link } from 'react-router-dom'

function Cart() {
    const {cartData, setCartData} = useContext(CartContext)
    console.log(cartData)

    function handleRemoveFromCart(i) {
        let newArr = [...cartData]
        newArr.splice(i, 1)
        setCartData(newArr)
    }

    if(cartData.length === 0){
        return <div className='w-full'>
            <div className='w-[50%] mx-auto'>
                <h1>Kuch order krle bhai bhuka marega kya....</h1>
                <Link to={"/"} className='bg-green-500 p-2 inline-block my-3'>Yaha se kr le bhai order</Link>
            </div>
        </div>
    }

  return (
    <div className='w-full'>
        <div className='w-[50%] mx-auto'>
            {
                cartData.map((data, i) => (
                        <div className='flex w-full justify-between my-5 p-2'>
                            <h2 className='w-[70%] text-3xl'>{data.name}</h2>
                            <div className='w-[30%] relative h-full'>
                                <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
                                <button onClick={() => handleRemoveFromCart(i)} className='bg-red-600 text-white absolute bottom-[-20px] left-5 text-lg font-bold rounded-xl border px-10 py-2 drop-shadow'>Remove</button>
                            </div>
                        </div>
                ))
            }
        </div>
    </div>
  )
}

export default Cart