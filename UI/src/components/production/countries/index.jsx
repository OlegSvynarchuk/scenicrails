import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Polygon } from 'react-leaflet'
import Country from '../countryPolygon/index.jsx'
import { loadCountriesAsync } from '../../../redux/countriesSlice'
import axios from 'axios'


export default function Countries({}) {

    const dispatch = useDispatch()
    
    useEffect(() => {
       dispatch(loadCountriesAsync())
       
    },[])


    const countryOptions = {color: 'green', weight: 1, fillColor: 'purple', }
    const countries = useSelector(state => state.countries)
    
    
    return (

     <>
        {(countries.length > 0) && countries.map(country => {
            
            return(
               <Country 
               key={country._id}
               country={country}
               countryOptions={countryOptions}
               />
            )
            
        })}
    </>
    )
    
}
