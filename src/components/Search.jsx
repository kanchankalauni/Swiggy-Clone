import React, { useContext, useEffect, useState } from 'react'
import { CartContext, Coordinates } from '../context/contextApi'
import Dishes from './Dishes'
import SearchBarRestaurantData from './SearchBarRestaurantData'

function Search() {

    const [searchQuery, setSearchQuery] = useState("")
    const [dishes, setDishes] = useState([])
    const [restaurantData, setRestaurantData] = useState([])

    const filterOptions = ["Restaurant", "Dishes"]

    const [activeBtn, setActiveBtn] = useState("Dishes")

    const { coord: { lat, lng } } = useContext(Coordinates)

    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }

    let x = ""
    function handleSearchQuery(e) {
        let val = e.target.value
        if(e.keyCode == 13){
            setSearchQuery(val)
        }
    }

    async function fetchDishes() {
        let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
        let res = await data.json()
        const finalData = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
            (data) => data?.card?.card?.info
        )
        setDishes(finalData)
    }

    async function fetchRestaurantData() {
        let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        const finalData = (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
            (data) => data?.card?.card?.info
        )
        setRestaurantData(finalData)
    }

    useEffect(() => {
        if (searchQuery === "") {
            return
        }
        fetchDishes()
        fetchRestaurantData()
    }, [searchQuery])

    return (
        <div className='w-full mt-10 md:w-[800px] mx-auto'>
            <div className='w-full relative flex'>
                <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
                <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
                <input 
                    // onChange={(e) => setSearchQuery(e.target.value)} 
                    onKeyDown={handleSearchQuery}
                    className='border-2 w-full px-10 py-3 text-xl focus:outline-none' 
                    type="text" 
                    placeholder='search for restaurant and food' 
                />
            </div>
            <div className='my-7 flex flex-wrap gap-3'>
                {
                    filterOptions.map((filterName) => (
                        <button onClick={() => handleFilterBtn(filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                        </button>
                    ))
                }
            </div>

            <div className='w-full md:w-[800px] grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#f4f5f7]'>
                {
                    activeBtn === "Dishes" ?
                        dishes.map((data) => <Dishes data={data}/>)
                        :
                        restaurantData.map((data) => <SearchBarRestaurantData data={data}/>)
                }
            </div>
        </div>
    )
}

export default Search