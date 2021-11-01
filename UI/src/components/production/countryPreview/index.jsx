import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import length from '@turf/length'
import * as turf from '@turf/turf'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import './countrypreview.css'

export default function CountryPreview({showCountryPreview, countryName, handleCloseCountryPreview, land}) {
const [countryRoutes, setCountryRoutes] = useState([])
const [loading, setLoading] = useState(false)   

// useEffect(() => {
//     if(countryName) {
//     setLoading(true)
//     axios.get('/api/getcountryroutes', {
//         params:  {
//             countryName : countryName
//         }}).then(res => {
//             setLoading(false)
//             setCountryRoutes(res.data)
//         }) 
//     }
   
// }, [countryName])

const {country} = useParams()
const countryInfo = useSelector(state => state.lines.lines.filter(line => line.country === country))

  //  if(showCountryPreview) {
        return (
        <div className='country-preview'>
            <Link to=''>{country}</Link>
            <p>Number of routes: {countryInfo.length}</p>
            <img className='country-preview-image' src={`/${country.toLowerCase()}.jpg`}></img>
            <p>{countryInfo[0].name}</p>
            {/* <button onClick={handleCloseCountryPreview}>X</button>
           <Link className='country-name'>{countryName}</Link> 
           <img className='country-preview-image' src={`/${countryName.toLowerCase()}.jpg`}></img>
            {(countryRoutes.length > 0 && !loading) && 
            <div>
                <p>{countryRoutes[0].name}</p>
                {land && <p>Number of routes: {land.routesCount}</p>}
            </div>} */}
        </div>
    )
//}

  //  return null


}
