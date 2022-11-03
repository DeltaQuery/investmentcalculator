import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    stAmount: 5000,
    contribution: 200,
    frequency: 1,
    date: "2012-10",
    asset: null,
    result: null,
    period: 10,
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setStAmount: (state, action) => {
            state.stAmount = action.payload
        },
        setPeriod: (state, action) => {
            state.period = action.payload
        },
        setAsset: (state, action) => {
            state.asset = action.payload
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setContribution: (state, action) => {
            state.contribution = action.payload
        },
        setFrequency: (state, action) => {
            state.frequency = action.payload
        },
        setResult: (state, action) => {
            state.result = action.payload
        }
    }

})

export const { setStAmount, setPeriod, setAsset, setDate, setContribution, setResult, setFrequency } = dataSlice.actions

export default dataSlice.reducer