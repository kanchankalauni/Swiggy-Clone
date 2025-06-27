import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false, 
        loginToggle : false,
        isDiffRes : false,
        isSimilarResDishes : false
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
        },
        toggleIsSimilarResDishes : (state) => {
            state.isSimilarResDishes = !state.isSimilarResDishes
        }
    }
})

export const { toogleSearchBar, toggleLogin, toggleDiffRes, toggleIsSimilarResDishes } = toogleSlice.actions
export default toogleSlice.reducer