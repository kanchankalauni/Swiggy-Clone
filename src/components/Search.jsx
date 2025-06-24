import React, { useContext, useEffect, useState } from 'react'
import { CartContext, Coordinates } from '../context/contextApi'

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
        <div className='w-full md:w-[800px] mx-auto'>
            <input onChange={(e) => setSearchQuery(e.target.value)} className='border-2 px-10 py-3 focus:outline-none' type="text" placeholder='search for restaurant and food' />
            <div className='my-7 flex flex-wrap gap-3'>
                {
                    filterOptions.map((filterName) => (
                        <button onClick={() => handleFilterBtn(filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                        </button>
                    ))
                }
            </div>

            <div>
                {
                    activeBtn === "Dishes" ?
                        dishes.map(
                            ({ 
                                card: { 
                                    card: { 
                                        info : { imageId = "", name, price, isVeg = 0 }, 
                                        restaurant : {info : {name, avgRating, sla : {slaString}}}
                                    },
                                },
                            }) => console.log(info)
                        ) 
                    : "restaurant"
                }
            </div>
        </div>
    )
}

export default Search