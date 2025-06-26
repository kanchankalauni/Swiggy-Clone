import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false, 
        loginToggle : false,
        isDiffRes : false
    },
    reducers : {
        toogleSearchBar : (state, action) => {
            state.searchBarToogle = !state.searchBarToogle
        },
        toggleLogin : (state) => {
            state.loginToggle = !state.loginToggle
        },
        toggleDiffRes : (state) => {
            state.isDiffRes = !state.isDiffRes
        }
    }
})

export const { toogleSearchBar, toggleLogin, toggleDiffRes } = toogleSlice.actions
export default toogleSlice.reducer