import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/Head"
import RestaurantMenu from "./components/RestaurantMenu"

function App() {

  return (
    <div>
        <Routes>
            <Route path="/" element={<Head/>}>
                <Route path="/" element={<Body/>}/>
                <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default App
