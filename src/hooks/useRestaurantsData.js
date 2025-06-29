import { useContext, useEffect, useState } from "react"
import { Coordinates } from "../context/contextApi"

function useRestaurantsData() {
  const [topRestaurantData, setTopRestaurantData] = useState([])
      const [topResTitle, setTopResTitle] = useState("")
      const [onlineTitle, setOnlineTitle] = useState("")
      const [onYourMindData, setOnYourMindData] = useState([])
      const [data, setData] = useState({})
      const { coord: { lat, lng } } = useContext(Coordinates)
  
  
      async function fetchData() {
          const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
          const result = await data.json()
          // console.log(result)
          setData(result.data)
          setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
          setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
  
          let topRestaurantMainData = result?.data?.cards.find(
              (data) => data?.card?.card?.id == "top_brands_for_you"
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants
  
          let topRestaurantMainData2 = result?.data?.cards.find(
              (data) => data?.card?.card?.id == "restaurant_grid_listing_v2"
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants
  
          setTopRestaurantData(topRestaurantMainData || topRestaurantMainData2)
  
          let onYourMindMainData = result?.data?.cards.find(
              (data) => data?.card?.card?.id == "whats_on_your_mind"
          )?.card?.card?.imageGridCards?.info
  
          setOnYourMindData(onYourMindMainData)
  
      }
  
      useEffect(() => {
          fetchData()
      }, [lat, lng]);

      return [topRestaurantData, topResTitle, onlineTitle, onYourMindData, data]

}

export default useRestaurantsData