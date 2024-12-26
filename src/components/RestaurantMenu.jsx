import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function RestaurantMenu() {
    const {id} = useParams()
    // console.log(id.split("-")[7].split("rest")[1])
    // console.log(id.split("-").at(-1).split("rest")[1])
    // console.log(id.match(/\d+/)[0])
    let mainId = id.split("-").at(-1).split("rest")[1]

    const [resInfo, setResInfo] = useState([])
    const [menuData, setMenuData] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [value, setValue] = useState(0);
    const [currIndex, setCurrIndex] = useState(null);

    function handleNext() {
        
    }

    function handlePrev() {
        
    }

    // console.log(menuData)

    async function fetchMenu() {
        let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        let res = await data.json()
        // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);
        setResInfo(res?.data?.cards[2]?.card?.card?.info)
        setDiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        let actualMenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards)
        setMenuData(actualMenu)
    }

    useEffect(() => {
        fetchMenu()
    }, [])

    function toogleFun(i) {
        setCurrIndex( i === currIndex ? null : i )
    }

  return (
    <div className='w-full'>
        <div className='w-[800px] mx-auto pt-8'>
            <p className='text-[10px] tex10-slate-400'> <Link to={"/"}><span className='hover:text-slate-700 cursor-pointer'>Home</span></Link> / <Link to={"/"}><span className='hover:text-slate-700 cursor-pointer'>{resInfo.city}</span></Link> / <span className='text-slate-700'>{resInfo.name}</span></p>
            <h1 className='font-bold pt-9 text-2xl'>{resInfo.name}</h1>
            <div className='w-full h-[160px] px-4 pb-4 bg-gradient-to-t from-slate-200/70 mt-5 rounded-[30px]'>
                <div className='w-full h-full p-4 border border-slate-200/70 rounded-[30px] bg-white'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <i className="text-green-700 text-lg fi fi-sr-circle-star"></i>  
                        <span>{resInfo.avgRating}</span>
                        <span>({resInfo.totalRatingsString})</span>
                        .
                        <span>{resInfo.costForTwoMessage}</span>
                    </div>
                    <p className='underline cursor-pointer font-semibold text-orange-600'>{resInfo?.cuisines?.join(", ")}</p>
                    <div className='flex gap-2 mt-3'>
                        <div className='w-[7px] flex flex-col justify-center items-center'>
                            <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                            <div className='w-[1.5px] h-[23px] bg-gray-300'></div>
                            <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                        </div>
                        <div className='flex flex-col text-sm gap-2 font-semibold'>
                            <p >Outlet <span className='text-gray-500 font-normal'>{resInfo.areaName}</span></p>
                            <p >{resInfo.sla?.slaString}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full overflow-hidden'>
                <div className='flex justify-between mt-8'>
                    <h1 className='font-bold text-xl'>Deals for you</h1>
                    <div className='flex gap-4'>
                        <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`text-xl mt-1 fi fi-rr-arrow-left ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
                        </div>
                        <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 180 ? "bg-gray-100" : "bg-gray-200")}>
                            <i className={`text-xl mt-1 fi fi-rr-arrow-right ` + (value >= 180 ? "text-gray-300" : "text-gray-800")}></i>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 mt-5'>
                    {
                        discountData.map((data) => (
                            <Discount data={data}/>
                        ))
                    }
                </div>
            </div>
            <h2 className='text-center mt-5'>MENU</h2>
            <div className='w-full mt-5 relative cursor-pointer'>
                <div className='w-full p-3 rounded-xl font-semibold bg-gray-100 text-center text-gray-600'>Search for dishes</div>
                <i className={"fi fi-rr-search absolute top-3 right-4"}></i>
            </div>
            <div>
                {
                    menuData.map(({card : {card : {itemCards, title}}}, i) => (
                        <div>
                            <div className='flex justify-between'>
                                <h1>{title} ({itemCards.length})</h1>
                                <i class="fi text-2xl fi-rs-angle-small-up"
                                 onClick={() => toogleFun(i)} 
                                ></i>
                            </div>
                            {
                                currIndex === i && 
                                <div className='m-5'>
                                    {
                                        itemCards.map(({card : {info}}) => (
                                            <h1>{info.name}</h1>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    </div>
  )
}

function Discount({data : {info : {header, offerLogo, couponCode}}}) {
    // console.log(info)
    return (
        <div className='flex gap-3 min-w-[328px] border p-3 h-[75.5px] rounded-2xl'>
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />
            <div>
                <h2 className='font-bold text-xl'>{header}</h2>
                <p className='text-gray-500'>{couponCode}</p>
            </div>
        </div>
    )
}

export default RestaurantMenu