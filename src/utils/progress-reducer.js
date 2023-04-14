import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
    name: "progress",
    initialState: [],
    reducers: {
        initializeProgress (state, action) {
            return action.payload;
        },
        updateProgress (state, action) {
            console.log("progress in slice: ", action.payload)
            const idx = action.payload
            return [...state.slice(0, idx), state[idx] + 1, ...state.slice(idx + 1)]
        },
    }
})
export const {initializeProgress, updateProgress} = progressSlice.actions;
export default progressSlice.reducer;