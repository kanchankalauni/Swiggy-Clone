import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard({info, link, currValue = false}) {
    console.log(info, link.split("/")[5])
  return (
    <Link to={`/restaurantMenu/${link.split("/")[5]}`}>
        <div className='hover:scale-95 duration-300'>
            <div className={`${currValue ? " w-[260px] " : " min-w-[295px] "} h-[182px] relative`}>
                <img className='w-full h-full object-cover rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${info?.cloudinaryImageId}`}/>
                <div className='bg-gradient-to-t from-black from-1% to-transparent to-40% w-full h-full absolute bottom-0 rounded-2xl'></div>
                <h2 className='absolute bottom-0 text-white text-xl font-bold px-3 pb-1'>
                    {
                        info?.aggregatedDiscountInfoV3 ? info?.aggregatedDiscountInfoV3?.header + " " + (info?.aggregatedDiscountInfoV3?.subHeader ? info?.aggregatedDiscountInfoV3?.subHeader : "") : ""
                    }
                </h2>
            </div>
            <div className='mt-2 px-3'>
                <h3 className='font-bold text-lg'>{info?.name}</h3>
                <div className='flex gap-1'>
                    <i className="text-green-700 text-xl fi fi-sr-circle-star"></i>
                    <p className='font-semibold text-lg'>{info?.avgRating + "." + info?.sla?.slaString}</p>
                </div>
                <p className='line-clamp-1 opacity-80'>{info?.cuisines.join(", ")}</p>
                <p className='opacity-80'>{info?.areaName}</p>
            </div>
        </div>
    </Link>
  )
}

export default RestaurantCard