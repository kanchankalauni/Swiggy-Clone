import React, { useEffect, useState } from 'react'
import OnYourMind from './onYourMind';

function Body() {

  return (
    <div className='w-full'>
        <div className='w-[75%] mx-auto mt-1 overflow-hidden'>
            <OnYourMind/>
        </div>
    </div>
  )
}

export default Body