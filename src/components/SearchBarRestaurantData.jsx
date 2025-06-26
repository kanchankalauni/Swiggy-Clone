import React from 'react'

function SearchBarRestaurantData({
    data: {
        card: {
            card: {
                info: {
                    id, cloudinaryImageId, aggregatedDiscountInfoV3 = {}, cuisines, promoted = false, costForTwoMessage, name: resName, avgRating, sla: { slaString }
                }
            }
        }
    }
}) {
    return (
        <div className='bg-white m-4 p-4 flex gap-5 items-center md:max-w-fit'>
            <div className='w-[30%]'>
                <img className='aspect-square rounded-lg' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" + cloudinaryImageId} alt="" />
            </div>
            <div className='w-[70%] text-sm'>
                <p className='font-bold line-clamp-1'>By {resName}</p>
                <div className='my-2 flex items-center gap-2 text-[11px] opacity-50 font-bold'>
                    <i class="fi fi-ss-star"></i> 
                    <p>{avgRating} . </p> 
                    <p>{slaString} . </p> 
                    <p>{costForTwoMessage}</p>
                </div>
                <p className='line-clamp-1 text-xs opacity-50'>{cuisines.join(", ")}</p>
            </div>
        </div>
    )
}

export default SearchBarRestaurantData