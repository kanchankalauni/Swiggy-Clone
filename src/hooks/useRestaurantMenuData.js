import { useContext, useEffect, useState } from "react";
import { Coordinates } from "../context/contextApi";
import { useParams } from "react-router-dom";

function useRestaurantMenuData() {

    const { id } = useParams()
    // console.log(id.split("-")[7].split("rest")[1])
    // console.log(id.split("-").at(-1).split("rest")[1])
    // console.log(id.match(/\d+/)[0])
    let mainId = id.split("-").at(-1).split("rest")[1]
    // console.log(mainId)

    const [resInfo, setResInfo] = useState([])
    const [menuData, setMenuData] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [topPicksData, setTopPicksData] = useState(null)
    const [value, setValue] = useState(0);
    const { coord: { lat, lng } } = useContext(Coordinates)
    // const [currIndex, setCurrIndex] = useState(false);

  async function fetchMenu() {
          // console.log(mainId.split("rest")[1]);
          let data = await fetch(
              `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
          );
  
          let res = await data.json();
  
          const resInfo = res?.data?.cards.find((data) =>
              data?.card?.card?.["@type"].includes("food.v2.Restaurant")
          )?.card?.card?.info;
  
  
          const discountInfo = res?.data?.cards.find((data) =>
              data?.card?.card?.["@type"].includes("v2.GridWidget")
          )?.card?.card?.gridElements?.infoWithStyle?.offers;
  
          setResInfo(resInfo);
          setDiscountData(discountInfo);
  
          let actualMenu = res?.data?.cards.find((data) => data?.groupedCard);
  
  
          setTopPicksData(
              (actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
                  (data) => data.card.card.title == "Top Picks"
              )[0]
          );
  
          setMenuData(
              actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                  (data) =>
                      data?.card?.card?.itemCards || data?.card?.card?.categories
              )
          );
      }
  
      useEffect(() => {
          fetchMenu()
      }, [])

      return [resInfo, menuData, discountData, topPicksData, value]

}

export default useRestaurantMenuData