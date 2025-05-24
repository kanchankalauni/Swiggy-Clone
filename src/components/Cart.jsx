import React, { useContext, useState } from 'react'
import { CartContext } from '../context/contextApi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';

function Cart() {
    // const { cartData, setCartData } = useContext(CartContext)
    // console.log(cartData)

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const dispatch = useDispatch()
    // console.log(cartData)
    // let totalPrice = cartData.reduce((acc, curVal) => (acc + (curVal.price / 100 || curVal.defaultPrice / 100)), 0)
    let totalPrice = cartData.reduce((acc, curVal) => {
        const price = curVal.price ?? curVal.defaultPrice;
        console.log(price)
        return acc + price / 100;
    }, 0);

    function handleRemoveFromCart(i) {
        if (cartData.length > 1) {
            let newArr = [...cartData]
            newArr.splice(i, 1)
            // setCartData(newArr)
            dispatch(deleteItem(newArr))
            toast.success("Item Removed")
        }
        else {
            handleClearCart()
            toast.success("Cart is clear")
        }
    }

    function handleClearCart() {
        // setCartData([])
        // localStorage.setItem("cartData", JSON.stringify([]))
        dispatch(clearCart())
        toast.success("Cart is clear")
    }

    function handlePlaceOrder() {
        toast.success("order placed")
    }

    if (cartData.length === 0) {
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
                            <div className='w-[70%] '>
                                <h2 className='text-3xl'>{data.name}</h2>
                                <p className='mt-2'>₹{data.price / 100 || data.defaultPrice / 100}</p>
                            </div>
                            <div className='w-[30%] relative h-full'>
                                <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
                                <button onClick={() => handleRemoveFromCart(i)} className='bg-red-600 text-white absolute bottom-[-20px] left-5 text-lg font-bold rounded-xl border px-10 py-2 drop-shadow'>Remove</button>
                            </div>
                        </div>
                    ))
                }
                <h1 className='my-2'>Total Price - ₹{totalPrice}</h1>
                <div className='flex justify-between'>
                    <button onClick={handlePlaceOrder} className='p-3 bg-green-600 rounded-lg my-7'>Place Order</button>
                    <button onClick={handleClearCart} className='p-3 bg-green-600 rounded-lg my-7'>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Cart