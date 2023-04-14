import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
    name: "plans",
    initialState: [],
    reducers: {
        initializePlan (state, action) {
            return action.payload;
        },
        updatePlan (state, action) {
            console.log("in slice: ", action.payload)
            return [...state, action.payload]
        },
        deletePlan (state, action) {
            const index = state.findIndex(plan => plan.id === action.payload)
            state.splice(index, 1);
        }
    }
})
export const {updatePlan, initializePlan, deletePlan} = planSlice.actions;
export default planSlice.reducer;