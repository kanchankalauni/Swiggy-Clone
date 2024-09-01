import React, { useEffect, useState } from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './TopRestaurant';
import OnlineFoodDelivery from './OnlineFoodDelivery';

function Body() {

    const [topRestaurantData, setTopRestaurantData] = useState([])
    const [onYourMindData, setOnYourMindData] = useState([])

    async function fetchData() {
        const data = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result = await data.json()
        // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
        setTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div className='w-full'>
        <div className='w-[75%] mx-auto mt-1 overflow-hidden'>
            <OnYourMind data={onYourMindData}/>
            <TopRestaurant data={topRestaurantData}/>
            <OnlineFoodDelivery data={topRestaurantData}/>
        </div>
    </div>
  )
}

export default Body