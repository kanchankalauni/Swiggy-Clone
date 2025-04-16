import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineFoodDelivery({data , title}) {

    const filterOptions = [
        {
            filterName : "Ratings 4.0"
        },
        {
            filterName : "Offers"
        },
        {
            filterName : "Rs. 300-Rs. 600"
        },
        {
            filterName : "Less than Rs. 300"
        },
    ]

    const [activeBtn, setActiveBtn] = useState(null)

    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }

  return (
    <div className='mt-10'>
        <h1 className='font-bold text-2xl'>{title}</h1>

        <div className='my-7 flex gap-3'>
        {
            filterOptions.map((data) => (
                <button onClick={() => handleFilterBtn(data.filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === data.filterName ? "active" : "")}>
                <p>{data.filterName}</p>
                <i className='fi text-sm mt-1 fi-br-cross hidden'></i>
                </button>
            ))
        }
        </div>

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