import React from 'react'
import { nonVeg, veg } from '../utils/links'
import AddToCartBtn from './AddToCartBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setSimilarResDish, toggleDiffRes } from '../utils/toogleSlice'
import { clearCart } from '../utils/cartSlice'
import { Link } from 'react-router-dom'

function Dish({
    data: {
        info,
        restaurant: { info: resInfo },
        hideRestaurantDetails = false
    }
}) {
    let { imageId = "", name, price, isVeg = 0, id : itemId } = info
    let { 
        id, 
        name: resName, 
        avgRating, 
        sla: { slaString }, 
        slugs : { 
            city,
            restaurant : resLocation
        } 
    } = resInfo

    // const isDiffRes = useSelector((state) => state.toogleSlice.isDiffRes)
    const { id: cartResId } = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch()


    // function handleIsDiffRes() {
    //     dispatch(toggleDiffRes())
    // }
    // function handleClearCart() {
    //     dispatch(clearCart())
    //     handleIsDiffRes()
    //     toast.success("Cart is clear")
    // }

    function handleSameRes() {
        if (cartResId == id || !cartResId) {
            // dispatch(toggleIsSimilarResDishes())
            dispatch(setSimilarResDish({
            isSimilarResDishes : true,
            city,
            resLocation,
            resId : id,
            itemId
        }))
        }
    }

    return (
        <div className='bg-white rounded-2xl p-4 m-4'>
            {
                !hideRestaurantDetails && (
                    <>
                        <Link to={`/restaurantMenu/${resLocation}-rest${id}`}>
                            <div className='flex justify-between text-sm opacity-50'>
                                <div>
                                    <p className='font-bold'>By {resName}</p>
                                    <div className='my-2 flex items-center gap-2'>
                                        <i class="fi fi-ss-star"></i>
                                        <p>{avgRating} .</p>
                                        <p>{slaString}</p>
                                    </div>
                                </div>
                                <i class="fi fi-rr-arrow-small-right text-2xl"></i>
                            </div>
                        </Link>
                        <hr className='border-dotted' />
                    </>
                )
            }



            <div className='my-3 md:max-w-fit flex justify-between'>
                <div className='w-[60%] md:w-[60%] flex flex-col gap-1'>
                    <div className='w-5 h-5'>
                        {
                            isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} alt="" />
                        }
                    </div>
                    <p className='text-lg font-semibold'>{name}</p>
                    <p className='font-semibold'><i class="fi fi-br-indian-rupee-sign text-xs mt-1"></i>{price / 100}</p>
                    <button className='px-4 py-1 w-max rounded-2xl border text-xs font-semibold opacity-70'>More Details <i class="fi fi-rr-angle-small-right"></i></button>
                </div>
                <div className='w-[40%] md:w-[40%] relative h-full'>
                    <img className='rounded-xl aspect-square object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                    <div onClick={handleSameRes}>
                        <AddToCartBtn
                            info={info}
                            resInfo={resInfo}
                        // handleIsDiffRes={handleIsDiffRes}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dish