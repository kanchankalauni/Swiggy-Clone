import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Coordinates, Visibility } from '../context/contextApi'

function Head() {

    const navItems = [
        {
            name : "Swiggy Corporate",
            image : "fi-ss-briefcase"
        },
        {
            name : "Search",
            image : "fi-rr-search"
        },
        {
            name : "Offers",
            image : "fi-rr-badge-percent"
        },
        {
            name : "Help",
            image : "fi-rr-exclamation"
        },
        {
            name : "Sign in",
            image : "fi-bs-user"
        },
        {
            name : "Cart",
            image : "fi-rr-shopping-cart"
        }
    ]

    const {visible, setVisible} = useContext(Visibility)
    
    const [searchResult, setSearchResult] = useState([])
    const [address, setAddress] = useState([""])

    const {setCoord} = useContext(Coordinates)

    function handleVisibility() {
        setVisible(prev => !prev)
    }

    async function searchResultFun(val) {
        if(val == "") return
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`);
        const data = await res.json();
        setSearchResult(data.data)
    }

    async function fetchLatAndLng(id) {
        if(id == "") return
        // console.log(id)
        handleVisibility();
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`);
        const data = await res.json();
        setCoord({
            lat : data.data[0].geometry.location.lat,
            lng : data.data[0].geometry.location.lng
        })
        console.log(data)
        setAddress(data.data[0].formatted_address);
    }

  return (
    <div className='relative w-full'>
        
        <div>
            <div onClick={handleVisibility} className={'w-full bg-black/50 h-full absolute z-30 ' + (visible ? "visible" : " invisible")}></div>
            <div className={'bg-white w-[40%] h-full p-5 z-40 absolute duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
                <i className='fi fi-br-cross' onClick={handleVisibility}></i>
                <input type="text" className='border p-5 focus:outline-none focus:shadow-lg' onChange={(e) => searchResultFun(e.target.value)}/>
                <div>
                    <ul>
                        {
                            searchResult.map((data) => (
                                <li onClick={() => fetchLatAndLng(data.place_id)}>
                                    {data.structured_formatting.main_text} 
                                    <p className='text-sm opacity-65'>
                                        {data.structured_formatting.secondary_text}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>

        <div className='w-full sticky bg-white z-20 top-0 shadow-md h-20 flex justify-center items-center'>
            <div className='flex justify-around w-[80%] gap-5'>
                <div className='flex items-center '>
                    <Link to={"/"}>
                        <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="Swiggy Logo" />
                    </Link>
                    <div className='flex items-center ' onClick={handleVisibility}>
                        <p className='flex items-center'>
                            <span className='font-bold border-b-2 border-black'>Other</span> 
                            <span className='ml-2 w-[150px] text-sm opacity-85 line-clamp-1'>{address}</span> 
                        </p>
                        <i className="text-2xl text-orange-500 fi fi-rs-angle-small-down"></i>
                    </div>
                </div>
                <div className='flex items-center gap-14'>
                    {
                        navItems.map((data) => (
                            <div className='flex items-center gap-3'>
                                <i className={`mt-1 text-xl text-gray-700 fi ` + data.image}></i>
                                <p className='text-lg font-medium text-gray-700'>{data.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        <Outlet/>
    </div>
  )
}

export default Head