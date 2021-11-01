import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadCountriesAsync = createAsyncThunk(
    'countries/loadCountriesAsync', 
     async () => {
         const response = await axios.get('/api/getcountries')
         
         return response.data
    }
)

const countriesSlice = createSlice({
    name: "countries",
    initialState: [],

   

    extraReducers: {
        [loadCountriesAsync.fulfilled]: (state, action) => {
            
            return (state.concat(action.payload.countries))
        },
        [loadCountriesAsync.rejected]: (state, action) => {
            return {...state, error: action.error.message}
        }

    }



})



export default countriesSlice.reducer