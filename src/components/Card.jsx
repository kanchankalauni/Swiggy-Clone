import React from 'react'

function Card({info}) {
    
  return (
    <div className='hover:scale-95 duration-300'>
        <div className='min-w-[295px] h-[182px] relative'>
            <img className='w-full h-full object-cover rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${info?.cloudinaryImageId}`}/>
            <div className='bg-gradient-to-t from-black from-1% to-transparent to-40% w-full h-full absolute bottom-0 rounded-2xl'></div>
            <h2 className='absolute bottom-0 text-white text-2xl font-bold px-3 pb-1'>{info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader}</h2>
        </div>
        <div className='mt-2 px-3'>
            <h3 className='font-bold text-lg'>{info?.name}</h3>
            <div className='flex gap-1'>
                <i className="text-green-700 text-xl fi fi-sr-circle-star"></i>
                <p className='font-semibold text-lg'>{info?.avgRating} <span className='mx-2 flex-col justify-center h-full'>.</span> {info?.sla?.slaString}</p>
            </div>
            <p className='line-clamp-1 opacity-80'>{info?.cuisines.join(", ")}</p>
            <p className='opacity-80'>{info?.areaName}</p>
        </div>
    </div>
  )
}

export default Card