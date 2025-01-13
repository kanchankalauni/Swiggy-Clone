import React from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineFoodDelivery({data , title}) {
  return (
    <div className='mt-10'>
        <h1 className='font-bold text-2xl'>{title}</h1>
        <div className="grid grid-cols-4 gap-10 mt-5">
            {
                data.map(({info, cta : {link}}) => (
                    <RestaurantCard info ={info}  link={link} currValue={true} />
                ))
            }
        </div>
    </div>
  )
}

export default OnlineFoodDelivery