import { configureStore } from "@reduxjs/toolkit";


import linesReducer from "./linesSlice";
import countriesReducer from './countriesSlice'



const store = configureStore({
    reducer: {
        
        lines: linesReducer,
        countries: countriesReducer
       
    },
    

})



export default store