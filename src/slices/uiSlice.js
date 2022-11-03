import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    inputGlow: 0
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setInputGlow: (state, action) => {
            state.inputGlow = action.payload
        },
    }
})

export const { setInputGlow } = uiSlice.actions

export default uiSlice.reducer