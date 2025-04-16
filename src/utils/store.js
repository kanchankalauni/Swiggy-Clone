import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "./toogleSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer : {
        toogleSlice : toogleSlice,
        cartSlice : cartSlice,
        filterSlice : filterSlice
    }
})

export default store;