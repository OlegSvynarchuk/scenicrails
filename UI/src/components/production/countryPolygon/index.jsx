
import React, {useState} from 'react'
import { Polygon, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import RoutPolyline from '../Polylines'
import { useHistory} from 'react-router'


export default function Country({country, countryOptions }) {
    const [zoom, setZoom] = useState(null)
    
    const history = useHistory()

    const map = useMap()
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(map.getZoom())
          },
    })
    
    
    return (
            <>
            <Polygon 
            pathOptions={countryOptions} 
            positions={country.geometry.coordinates} 
            eventHandlers = {
               {
                   click: () => {
                      
                        history.push(`/home/${country.name}`)
                    //    {handleShowCountryPreview(country.name, country)}
                   },
                  

               }
            }
            
            
        >
            <RoutPolyline zoomValue={zoom} />
            {zoom < 6 && <Tooltip  className='tooltip' opacity={1}>
                <div>
                    <h3>{country.name}</h3>
                    
                </div>
            </Tooltip>}
        </Polygon>
        
        </>
    )
}


