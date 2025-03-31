import React, { useContext, useEffect, useState } from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './TopRestaurant';
import OnlineFoodDelivery from './OnlineFoodDelivery';
import { Coordinates } from '../context/contextApi';

function Body() {

    const [topRestaurantData, setTopRestaurantData] = useState([])
    const [topResTitle, setTopResTitle] = useState("")
    const [onlineTitle, setOnlineTitle] = useState("")
    const [onYourMindData, setOnYourMindData] = useState([])
    const [data, setData] = useState({})
    const {coord : {lat, lng}} = useContext(Coordinates)
    

    async function fetchData() {
        const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const result = await data.json()
        // console.log(result.data)
        setData(result.data)
        setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
        setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
        setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
        setTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    useEffect(() => {
        fetchData()
    }, [lat, lng]);

    if (data.communication) {
        return <div className='mt-40 flex flex-col justify-center items-center'>
            <img className='w-72' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy.f_auto.q_auto.w_476.h_476/portal/m/location_unserviceable.png" alt="" />
            <h1>Location Unserviceable</h1>
        </div>
    }

  return (
    <div className='w-full'>
        <div className='w-[75%] mx-auto mt-1 overflow-hidden'>
            <OnYourMind data={onYourMindData}/>
            <TopRestaurant data={topRestaurantData} title={topResTitle}/>
            <OnlineFoodDelivery data={topRestaurantData} title={onlineTitle}/>
        </div>
    </div>
  )
}

export default Body