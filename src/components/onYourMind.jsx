import React, { useEffect, useState } from 'react'

function OnYourMind() {

    const [data, setData] = useState([])

    const [value, setValue] = useState(0);

    async function fetchData() {
        const data = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result = await data.json()
        setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleNext() {
        value >= 180 ? "" : setValue((prev) => prev + 45)    
    }

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 45)
    }

  return (
    <div>
        <div className='flex justify-between mt-3'>
            <h1 className='font-bold text-2xl'>What's on your mind</h1>
            <div className='flex gap-4'>
                <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                    <i className={`text-xl mt-1 fi fi-rr-arrow-left ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
                <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 180 ? "bg-gray-100" : "bg-gray-200")}>
                    <i className={`text-xl mt-1 fi fi-rr-arrow-right ` + (value >= 180 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
            </div>
        </div>    
        <div
            style={{translate : `-${value}%`}}
            className={`flex mt-2 duration-300`}>
            {
                data.map((item) => (
                    <img className='w-40' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}/>
                ))
            }
        </div>
        <hr className='border mt-8'/>
    </div>
  )
}

export default OnYourMind;