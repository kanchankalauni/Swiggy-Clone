import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantMenu() {
    const {id} = useParams()
    // console.log(id.split("-")[7].split("rest")[1])
    // console.log(id.split("-").at(-1).split("rest")[1])
    // console.log(id.match(/\d+/)[0])
    let mainId = id.split("-").at(-1).split("rest")[1]

    const [menuData, setMenuData] = useState("")

    async function fetchMenu() {
        let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65200&lng=77.16630&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        let res = await data.json()
        // console.log(res?.data?.cards[0]?.card?.card?.text);
        setMenuData(res?.data?.cards[0]?.card?.card?.text)
    }

    useEffect(() => {
        fetchMenu()
    }, [])

  return (
    <div>RestaurantMenu --- {mainId} {menuData}</div>
  )
}

export default RestaurantMenu