import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadLinesAsync = createAsyncThunk(
    'lines/loadLinesAsync', 
     async () => {
         const response = await axios.get('/api/getlines')
         return response.data
    }
)

const linesSlice = createSlice({
    name: "lines",
    initialState: [],

   

    extraReducers: {
        [loadLinesAsync.fulfilled]: (state, action) => {
            return {...state, lines: action.payload}
        },
        [loadLinesAsync.rejected]: (state, action) => {
            return {...state, error: action.error.message}
        }

    }



})

export const {loadLines} = linesSlice.actions;

export default linesSlice.reducer