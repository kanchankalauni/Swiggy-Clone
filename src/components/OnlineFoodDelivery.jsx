import React from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineFoodDelivery({data}) {
  return (
    <div className='mt-10'>
        <h1 className='font-bold text-2xl'>Restaurants with online food delivery in Delhi</h1>
        <div className="grid grid-cols-4 gap-10 mt-5">
            {
                data.map(({info}) => (
                    <RestaurantCard info ={info} currValue={true} />
                ))
            }
        </div>
    </div>
  )
}

export default OnlineFoodDelivery