import React, { useState } from 'react'
import { addToCart, clearCart } from '../utils/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function AddToCartBtn({ info, resInfo }) {

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const getResInfoFromLocalStore = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch()
    const [isDiffRes, setIsDiffRes] = useState(false)

    function handleIsDiffRes() {
        setIsDiffRes((prev) => !prev)
    }

    function handleClearCart() {
        console.log("first")
        dispatch(clearCart())
        handleIsDiffRes()
        toast.success("Cart is clear")
    }

    function handleAddToCart() {
        const isAdded = cartData.find((data) => data.id === info.id)
        if (!isAdded) {
            if (getResInfoFromLocalStore.name === resInfo.name || getResInfoFromLocalStore.length === 0) {
                dispatch(addToCart({ info, resInfo }))
                toast.success("Food added to the cart")
            }
            else {
                toast.error("Different restaurant")
                handleIsDiffRes()
            }
        }
        else {
            toast.error("Food already added to the cart")
        }
    }

    return (
        <div>
            <button
                onClick={handleAddToCart}
                className='bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow'
            >
                Add
            </button>
            {
                isDiffRes &&
                <div className='w-[520px] h-[204px] flex flex-col gap-2 p-8 left-[33%] border z-50 shadow-md fixed bottom-10 bg-white'>
                    <h1>Items already in cart</h1>
                    <p>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className='flex justify-evenly w-full gap-3'>
                        <button onClick={handleIsDiffRes} className='border-2 w-1/2 p-3 border-green-600 text-green-600'>NO</button>
                        <button onClick={handleClearCart} className='w-1/2 p-3 bg-green-600 text-white'>YES, STRAT AFRESH</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddToCartBtn