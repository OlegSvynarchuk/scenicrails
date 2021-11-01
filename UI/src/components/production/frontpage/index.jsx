import React from 'react'
import Mapcontainer from '../map/index.jsx'
import {useState, useEffect} from 'react'
import axios from 'axios'
import * as L from 'leaflet'
import {Polygon} from 'react-leaflet'
import './frontpage.css'
import { useDispatch, useSelector } from 'react-redux'
import Country from '../countryPolygon/index.jsx'
import CountryPreview from '../countryPreview/index.jsx'
import { loadLinesAsync } from '../../../redux/linesSlice.js'
import { loadCountriesAsync } from '../../../redux/countriesSlice.js'
import { Route, Switch, useParams } from 'react-router'
import Countries from '../countries/index.jsx'




export default function FrontPage({showPreview}) {
    L.Control.include({
        _refocusOnMap: L.Util.falseFn // Do nothing.
      });
    
    
    
    const dispatch = useDispatch()
      



    
    

    useEffect(() => {
        dispatch(loadLinesAsync())
       
    },[dispatch])
    
   
   
    
    return (
        <div className='frontpage'>
            
            
            <Mapcontainer className='frontPageMap'
                          zoom={4}
                          center={[44.016521, 21.005859]}
                          
            >
                <Countries />  
            </Mapcontainer>
            
            <Switch>
                <Route path={'/home/:country'}>
                    <CountryPreview />
                </Route>
            </Switch>
        </div>
    )
}
