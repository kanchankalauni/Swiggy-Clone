import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/Head"
import RestaurantMenu from "./components/RestaurantMenu"
import { CartContext, Coordinates, Visibility } from "./context/contextApi"
import { useEffect, useState } from "react"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"

function App() {

    // const [visible, setVisible] = useState(false);
    const [coord, setCoord] = useState({lat : 28.5355161, lng : 77.3910265})
    // const [cartData, setCartData] = useState([])
    const visible = useSelector((state) => state.toogleSlice.searchBarToogle)

    // function getDataFromLocalStorage() {
    //     let data = JSON.parse(localStorage.getItem("cartData")) || []
    //     setCartData(data)
    // }

    // useEffect(() => {
    //     getDataFromLocalStorage()
    // }, [])

  return (
    // <CartContext.Provider value={{cartData, setCartData}}>
        <Coordinates.Provider value={{coord, setCoord}}>
            {/* <Visibility.Provider value={{visible, setVisible}}> */}
                <div className={visible ? "overflow-hidden max-h-screen" : ""}>
                    <Routes>
                        <Route path="/" element={<Head/>}>
                            <Route path="/" element={<Body/>}/>
                            <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/*" element={<h1>Coming soon.....</h1>}/>
                        </Route>
                    </Routes>
                </div>
            {/* </Visibility.Provider> */}
        </Coordinates.Provider>
    // </CartContext.Provider>
  )
}

export default App
