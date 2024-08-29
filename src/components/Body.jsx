import React, { useEffect, useState } from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './TopRestaurant';

function Body() {

  return (
    <div className='w-full'>
        <div className='w-[75%] mx-auto mt-1 overflow-hidden'>
            <OnYourMind/>
            <TopRestaurant/>
        </div>
    </div>
  )
}

export default Body