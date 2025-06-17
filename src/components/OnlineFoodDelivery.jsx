import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux'
import { setFilterValue } from '../utils/filterSlice'

function OnlineFoodDelivery({data , title}) {

    const filterOptions = ["Ratings 4.0","Offers","Rs. 300-Rs. 600","Less than Rs. 300"]

    const [activeBtn, setActiveBtn] = useState(null)

    const dispatch = useDispatch()

    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? null : filterName)
        // dispatch(setFilterValue(activeBtn))
    }
    dispatch(setFilterValue(activeBtn))

  return (
    <div className='mt-10'>
        <h1 className='font-bold text-2xl'>{title}</h1>

        <div className='my-7 flex flex-wrap gap-3'>
        {
            filterOptions.map((filterName) => (
                <button onClick={() => handleFilterBtn(filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === filterName ? "active" : "")}>
                <p>{filterName}</p>
                <i className='fi text-sm mt-1 fi-br-cross hidden'></i>
                </button>
            ))
        }
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mt-5">
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