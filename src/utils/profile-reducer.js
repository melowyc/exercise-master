import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        username: null,
        country: null,
        age: null,
        heartRate: null,
        height: null,
        sleep: null,
        water: null,
        weight: null,
        likes: [],
    },
    reducers: {
        updateProfile (state, action) {
            console.log({...state, ...action.payload})
            return {...state, ...action.payload}
        }
    }
})
export const {updateProfile} = profileSlice.actions;
export default profileSlice.reducer;