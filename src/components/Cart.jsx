import React, { useContext, useState } from 'react'
import { CartContext } from '../context/contextApi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../utils/toogleSlice';

let veg = "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
let nonVeg = "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"

function Cart() {
    // const { cartData, setCartData } = useContext(CartContext)
    // console.log(cartData)

    const navigate = useNavigate()
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const resInfo = useSelector((state) => state.cartSlice.resInfo)
    console.log(resInfo)
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

    const userData = useSelector((state) => state.authSlice.userData)

    function handleClearCart() {
        // setCartData([])
        // localStorage.setItem("cartData", JSON.stringify([]))
        dispatch(clearCart())
        toast.success("Cart is clear")
    }

    function handlePlaceOrder() {
        if (!userData) {
            toast.error("login kr le bhai")
            dispatch(toggleLogin())
            return
        }
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
                <Link to={`/restaurantMenu/${resInfo.id}`}>
                {console.log(resInfo.id)}
                    <div className='my-10 flex gap-5'>
                        <img className='rounded-xl w-40 aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + resInfo.cloudinaryImageId} alt="" />
                        <div>
                            <p className='text-5xl border-b-2 border-black pb-3'>{resInfo.name}</p>
                            <p className='mt-3 text-xl'>{resInfo.areaName}</p>
                        </div>
                    </div>
                </Link>
                <div>
                    {cartData.map(({ name, defaultPrice, price, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } }, description = "", imageId }, i) => {
                        {/* const [isMore, setIsMore] = useState(false) */}
                        let trimDes = description.substring(0, 140) + "..."
                        return (
                            <>
                                <div className='flex w-full my-5 justify-between min-h-[182px]'>
                                    <div className='w-[70%]'>
                                        <img className='w-5 rounded-sm' src={vegClassifier === "VEG" ? veg : nonVeg} alt="" />
                                        <h1 className='font-semibold text-lg'>{name}</h1>
                                        <p className='font-semibold text-lg'>₹{defaultPrice / 100 || price / 100}</p>
                                        <div className='flex items-center gap-1'>
                                            <i className={"fi mt-1 text-xl fi-ss-star"}></i>
                                            {rating && <span>{rating} ({ratingCountV2})</span>}
                                        </div>
                                        <div className='line-clamp-2'>{description}</div>
                                        {/* {
                                            description.length > 140 ? <div>
                                                <span >{isMore ? description + " " : trimDes}</span>
                                                <button className='font-bold' onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                                            </div> : <span >{description}</span>
                                        } */}
                                    </div>
                                    <div className='w-[20%] relative h-full'>
                                        <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                                        <button onClick={handleRemoveFromCart} className='bg-white absolute bottom-[-20px] left-5 text-lg text-red-500 font-bold rounded-xl border px-10 py-2 drop-shadow'>Remove</button>
                                    </div>
                                </div>
                                <hr className='my-5' />
                            </>
                        )
                    })}
                </div>
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