import React from 'react'

function Card({info}) {
    console.log(info)
  return (
    <div>
        <div className='relative'>
            <div className='min-w-[295px] h-[182px]'>
                <img className='w-full h-full object-cover rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${info?.cloudinaryImageId}`}/>
            </div>
        <h2 className='absolute bottom-0 text-white text-2xl font-bold px-3 pb-1'>ITEMS {info?.aggregatedDiscountInfoV3?.subHeader}</h2>
        </div>
        <div className='mt-2 px-3'>
            <h3 className='font-bold text-lg'>{info?.name}</h3>
            <div className='flex gap-1'>
                <i className="text-green-700 text-xl fi fi-sr-circle-star"></i>
                <p className='font-semibold text-lg'>{info?.avgRating} . {info?.sla?.slaString}</p>
            </div>
            <p className='opacity-80'>{info?.cuisines}</p>
            <p className='opacity-80'>{info?.areaName}</p>
        </div>
    </div>
  )
}

export default Card