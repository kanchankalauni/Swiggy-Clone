import React from 'react'
import { nonVeg, veg } from '../utils/links'
import AddToCartBtn from './AddToCartBtn'

function Dishes({ 
    data: { 
        card: {
            card: {
                info,
                restaurant: { 
                    info: resInfo
                }
            }
        } 
    } 
}) {

    let { imageId = "", name, price, isVeg = 0 } = info
    let { id, name: resName, avgRating, sla: { slaString } } = resInfo

    return (
        <div className='bg-white rounded-2xl p-4 m-4'>
            <div className='flex justify-between text-sm opacity-50'>
                <div>
                    <p className='font-bold'>By {resName}</p>
                    <p className='my-2'><i class="fi fi-ss-star"></i> {avgRating} . {slaString}</p>
                </div>
                <i class="fi fi-rr-arrow-small-right text-2xl"></i>
            </div>

            <hr className='border-dotted'/>

            <div className='my-3 md:max-w-fit flex justify-between'>
                <div className='w-[60%] flex flex-col gap-1'>
                    <div className='w-5 h-5'>
                        {
                            isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} alt="" />
                        }
                    </div>
                    <p className='text-lg font-semibold'>{resName}</p>
                    <p className='font-semibold'><i class="fi fi-br-indian-rupee-sign text-xs mt-1"></i>{price/100}</p>
                    <button className='px-4 py-1 w-max rounded-2xl border text-xs font-semibold opacity-70'>More Details <i class="fi fi-rr-angle-small-right"></i></button>
                </div>
                <div className='w-[40%] md:w-[40%] relative h-full'>
                    <img className='rounded-xl aspect-square object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                    {/* <button className='bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow'>Add</button> */}
                    <AddToCartBtn 
                        info={info} 
                        resInfo={resInfo} 
                        // handleIsDiffRes={handleIsDiffRes}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dishes