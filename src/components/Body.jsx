import React, { useContext, useEffect, useState } from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './TopRestaurant';
import OnlineFoodDelivery from './OnlineFoodDelivery';
import { Coordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import useRestaurantsData from '../hooks/useRestaurantsData';

function Body() {

    const [topRestaurantData, topResTitle, onlineTitle, onYourMindData, data] = useRestaurantsData()

    const filterVal = useSelector((state => state.filterSlice.filterVal))

    const filteredData = topRestaurantData && topRestaurantData?.filter(item => {
        // console.log(item)
        if (!filterVal) return true;

        switch (filterVal) {
            case "Ratings 4.0": return item?.info?.avgRating > 4
            case "Offers": return item?.info?.aggregatedDiscountInfoV3 ? item?.info?.aggregatedDiscountInfoV3 : ""
            case "Rs. 300-Rs. 600": return item?.info?.costForTwo?.slice(1, 4) >= 300 && item?.info?.costForTwo?.slice(1, 4) <= 600
            case "Less than Rs. 300": return item?.info?.costForTwo?.slice(1, 4) < 300
            default: return true;
        }
    })

    if (data.communication) {
        return <div className='mt-40 flex flex-col justify-center items-center'>
            <img className='w-72' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy.f_auto.q_auto.w_476.h_476/portal/m/location_unserviceable.png" alt="" />
            <h1>Location Unserviceable</h1>
        </div>
    }

    return (
        <div className='w-full'>
            {topRestaurantData.length ? (
                <div className='w-full px-10 sm:w-[80%] lg:w-[80%] mx-auto mt-1 overflow-hidden'>
                    {
                        onYourMindData && (
                            <>
                                {onYourMindData && <OnYourMind data={onYourMindData} />}
                                <TopRestaurant data={topRestaurantData} title={topResTitle} />
                            </>
                        )
                    }
                    {topRestaurantData && <OnlineFoodDelivery data={filterVal ? filteredData : topRestaurantData} title={onlineTitle} />}
                </div>
            ) : (
                <Shimmer />
            )}

        </div>
    )
}

export default Body