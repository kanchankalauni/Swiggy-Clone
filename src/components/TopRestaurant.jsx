import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard';

function TopRestaurant({data}) {
    console.log(data)
    // const [data, setData] = useState([])

    const [value, setValue] = useState(0);

    // async function fetchData() {
    //     const data = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     const result = await data.json()
    //     // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    function handleNext() {
        value >= 450 ? "" : setValue((prev) => prev + 50)    
    }

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 50)
    }

  return (
    <div className='mt-10'>
        <div className='flex justify-between mt-5'>
            <h1 className='font-bold text-2xl'>Top restaurant chains in Delhi</h1>
            <div className='flex gap-4'>
                <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                    <i className={`text-xl mt-1 fi fi-rr-arrow-left ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
                <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 450 ? "bg-gray-100" : "bg-gray-200")}>
                    <i className={`text-xl mt-1 fi fi-rr-arrow-right ` + (value >= 450 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
            </div>
        </div>    
        <div className={`flex mt-4 gap-5 duration-300`} style={{translate : `-${value}%`}}>
            {
                data.map(({info, cta : {link}}) => (
                    <RestaurantCard info ={info} link={link} />
                ))
            }
        </div>
        <hr className='border mt-10'/>
    </div>
  )
}

export default TopRestaurant