import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

let veg = "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
let nonVeg = "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"

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
    // const [currIndex, setCurrIndex] = useState(false);

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
        let actualMenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
        console.log(actualMenu)
        setMenuData(actualMenu)
    }

    useEffect(() => {
        fetchMenu()
    }, [])

    // function toggleFun(i) {
    //     setCurrIndex(!currIndex);
    // }

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
                    menuData.map(({card : {card}}) => (
                            <MenuCard card={card}/>
                    ))
                }
            </div>

        </div>
    </div>
  )
}


function MenuCard({card}) {

    let hello = false;
    if (card["@type"]) {
        hello = true;
    }

    const [isOpen, setIsOpen] = useState(hello);

    // if(!card["@type"]){
    //     setIsOpen(false);
    // }

    function toggleDropDown() {
        setIsOpen((prev) => !prev)
    }

    if(card.itemCards){
        const {title, itemCards} = card;
        return(
            <>
                <div className='mt-7'>
                    <div className='flex justify-between'>
                        <h1 className={'font-bold text-' + (card["@type"] ? "xl" : "base")}>{title} ({itemCards.length})</h1>
                        <i className={"fi text-xl fi-rr-angle-small-" + (isOpen ? "up" : "down")} onClick={toggleDropDown}></i>
                    </div>
                    { 
                        isOpen && <DetailMenu itemCards={itemCards}/>
                    }
                </div>
                <hr className={'my-5 border-' + (card["@type"]) ? "[10px]" : "[4px]"}/>
            </>
        )
    }
    else{
        const {title, categories} = card;
        return(
            <div>
                <h1 className='font-bold text-xl'>{title}</h1>
                {
                    categories.map((data) => (
                        <MenuCard card={data}/>
                    ))
                }
            </div>
        )
    }
}

function DetailMenu({itemCards}) {
    return(
        <div className='my-5'>
            {
                itemCards.map(({card : {info : {name, defaultPrice, price, itemAttribute : {vegClassifier}, ratings : {aggregatedRating : {rating, ratingCountV2}}, description = "", imageId}}}) => {
                    const [isMore, setIsMore] = useState(false)
                    let trimDes = description.substring(0, 140) + "..."
                    return (
                    <>
                        <div className='flex w-full justify-between min-h-[182px]'>
                            <div className='w-[70%]'>
                                <img className='w-5 rounded-sm' src={vegClassifier === "VEG" ? veg : nonVeg} alt=""/>
                                <h1 className='font-semibold text-lg'>{name}</h1>
                                <p className='font-semibold text-lg'>₹{defaultPrice / 100 || price / 100}</p>
                                <div className='flex items-center gap-1'>
                                    <i className={"fi mt-1 text-xl fi-ss-star"}></i>
                                    { rating && <span>{rating} ({ratingCountV2})</span>}
                                </div>
                                {
                                    description.length > 140 ? <div>
                                        <span >{isMore ? description + " " : trimDes}</span>
                                        <button className='font-bold' onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                                    </div> : <span >{description}</span>
                                }
                            </div>
                            <div className='w-[20%] relative h-full'>
                                <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                                <button className='bg-white absolute bottom-[-20px] left-5 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow'>Add</button>
                            </div>
                        </div>
                        <hr className='my-5'/>
                    </>
                )})
            }
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