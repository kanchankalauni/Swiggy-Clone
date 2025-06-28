import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext, Coordinates } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart } from '../utils/cartSlice'
import toast from 'react-hot-toast'
import AddToCartBtn from './AddToCartBtn'
import { toggleDiffRes } from '../utils/toogleSlice'
import { MenuShimmer } from './Shimmer'

let veg = "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
let nonVeg = "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"

function RestaurantMenu() {
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

    function handleNext() {

    }

    function handlePrev() {

    }

    // console.log(menuData)

    async function fetchMenu() {
        // console.log(mainId.split("rest")[1]);
        let data = await fetch(
            `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
        );

        // https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.9690247&lng=72.8205292&restaurantId=233329&catalog_qa=undefined&submitAction=ENTER
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

    // function toggleFun(i) {
    //     setCurrIndex(!currIndex);
    // }

    return (
        <div className='w-full'>
            {menuData.length ? <div className='w-[95%] md:w-[800px] mx-auto pt-8'>
                <p className='text-[10px] tex10-slate-400'> <Link to={"/"}><span className='hover:text-slate-700 cursor-pointer'>Home</span></Link> / <Link to={"/"}><span className='hover:text-slate-700 cursor-pointer'>{resInfo?.city}</span></Link> / <span className='text-slate-700'>{resInfo.name}</span></p>
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
                                <Discount data={data} />
                            ))
                        }
                    </div>
                </div>
                <h2 className='text-center mt-5'>MENU</h2>
                <div className='w-full mt-5 relative cursor-pointer'>
                    <Link to={"/search"}>
                        <div className='w-full p-3 rounded-xl font-semibold bg-gray-100 text-center text-gray-600'>Search for dishes</div>
                    </Link>
                    <i className={"fi fi-rr-search absolute top-3 right-4"}></i>
                </div>

                {
                    topPicksData && <div className='w-full overflow-hidden'>
                        <div className='flex justify-between mt-8'>
                            <h1 className='font-bold text-xl'>{topPicksData.card.card.title}</h1>
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
                                topPicksData.card.card.carousel.map(({ creativeId, dish: { info: { defaultPrice, price } } }) => (
                                    <div className='min-w-[400px] h-[405px] relative'>
                                        <img className='w-full h-full' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/` + creativeId} alt="" />
                                        <div className='absolute bottom-4 text-white flex justify-between w-full px-5'>
                                            <p>₹{defaultPrice / 100 || price / 100}</p>
                                            <button className='px-10 py-2 font-bold text-green-400 bg-white rounded-xl'>Add</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }


                <div>
                    {
                        menuData.map(({ card: { card } }) => (
                            <MenuCard card={card} resInfo={resInfo} />
                        ))
                    }
                </div>

            </div> : <MenuShimmer />}
        </div>
    )
}


function MenuCard({ card, resInfo }) {

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

    if (card.itemCards) {
        const { title, itemCards } = card;
        return (
            <>
                <div className='mt-7'>
                    <div className='flex justify-between'>
                        <h1 className={'font-bold text-' + (card["@type"] ? "xl" : "base")}>{title} ({itemCards.length})</h1>
                        <i className={"fi text-xl fi-rr-angle-small-" + (isOpen ? "up" : "down")} onClick={toggleDropDown}></i>
                    </div>
                    {
                        isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />
                    }
                </div>
                <hr className={'my-5 border-' + (card["@type"]) ? "[10px]" : "[4px]"} />
            </>
        )
    }
    else {
        const { title, categories } = card;
        return (
            <div>
                <h1 className='font-bold text-xl'>{title}</h1>
                {
                    categories.map((data) => (
                        <MenuCard card={data} resInfo={resInfo} />
                    ))
                }
            </div>
        )
    }
}

function DetailMenu({ itemCards, resInfo }) {
    return (
        <div className='my-5'>
            {
                itemCards.map(({ card: { info } }) => (<DetailMenuCard info={info} resInfo={resInfo} />))
            }
        </div>
    )
}

function DetailMenuCard({ info, resInfo }) {

    const { name, defaultPrice, price, itemAttribute, ratings: { aggregatedRating: { rating, ratingCountV2 } }, description = "", imageId } = info;

    // const {cartData, setCartData} = useContext(CartContext)


    // const isDiffRes = useSelector((state) => state.toogleSlice.isDiffRes)
    // const dispatch = useDispatch()

    // function handleIsDiffRes() {
    //     dispatch(toggleDiffRes())
    // }

    // function handleClearCart() {
    //     dispatch(clearCart())
    //     handleIsDiffRes()
    //     toast.success("Cart is clear")
    // }

    const [isMore, setIsMore] = useState(false)
    let trimDes = description.substring(0, 140) + "..."
    return (
        <div className='relative w-full'>
            <div className='flex w-full justify-between min-h-[182px]'>
                <div className='w-[55%] md:w-[70%]'>
                    <img className='w-5 rounded-sm' src={itemAttribute && itemAttribute.vegClassifier === "VEG" ? veg : nonVeg} alt="" />
                    <h1 className='font-semibold text-lg'>{name}</h1>
                    <p className='font-semibold text-lg'>₹{defaultPrice / 100 || price / 100}</p>
                    <div className='flex items-center gap-1'>
                        <i className={"fi mt-1 text-xl fi-ss-star"}></i>
                        {rating && <span>{rating} ({ratingCountV2})</span>}
                    </div>
                    {
                        description.length > 140 ? <div>
                            <span className='line-clamp-2 md:line-clamp-none'>{isMore ? description + " " : trimDes}</span>
                            <button className='hidden md:block font-bold' onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                        </div> : <span >{description}</span>
                    }
                </div>
                <div className='w-[40%] md:w-[20%] relative h-full'>
                    <img className='rounded-xl aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                    <AddToCartBtn
                        info={info}
                        resInfo={resInfo}
                    // handleIsDiffRes={handleIsDiffRes}
                    />
                </div>
            </div>
            <hr className='my-5' />
            {/* {
                isDiffRes &&
                <div className='w-[520px] h-[204px] flex flex-col gap-2 p-8 left-[33%] border z-50 shadow-md fixed bottom-10 bg-white'>
                    <h1>Items already in cart</h1>
                    <p>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className='flex justify-evenly w-full gap-3'>
                        <button onClick={handleIsDiffRes} className='border-2 w-1/2 p-3 border-green-600 text-green-600'>NO</button>
                        <button onClick={handleClearCart} className='w-1/2 p-3 bg-green-600 text-white'>YES, STRAT AFRESH</button>
                    </div>
                </div>
            } */}
        </div>
    )
}


function Discount({ data: { info: { header, offerLogo, couponCode } } }) {
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