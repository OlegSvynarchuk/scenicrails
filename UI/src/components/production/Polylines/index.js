import React from 'react'
import { useSelector } from 'react-redux'
import {Polyline,  LayerGroup, Tooltip, Popup} from 'react-leaflet'




export default function RoutPolyline({zoomValue}) {
    const limeOptions = { color: 'red', fillColor: 'purple', weight: 4 }
    const {lines} = useSelector(state => state.lines)
    
    return (
        <div>
           {zoomValue > 4 && <LayerGroup>
                {lines.map(line => {
                    const lineName = line.name
                    return(
                        <Polyline 
                        key={line.name}
                        pathOptions={limeOptions} 
                        positions={line.location.coordinates}

                        eventHandlers={{
                            mouseover: (e) => {
                              e.target.setStyle({ color: 'green',
                              
                            })
                            },
                            mouseout: (e) => {
                              e.target.setStyle({ color: 'red',
                              
                            })
                              },
                            click: () => {
                               
                            }

                          }}
                        
                        >   
                            <Popup><a>{lineName}</a></Popup>
                            <Tooltip>{lineName}</Tooltip>
                            
                        </Polyline>
                    )
                })}
            </LayerGroup> }
            
        </div>
    )
}


