import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false, 
        loginToggle : false
    },
    reducers : {
        toogleSearchBar : (state, action) => {
            state.searchBarToogle = !state.searchBarToogle
        },
        toggleLogin : (state) => {
            state.loginToggle = !state.loginToggle
        }
    }
})

export const { toogleSearchBar, toggleLogin } = toogleSlice.actions
export default toogleSlice.reducer