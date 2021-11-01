import React from 'react'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'



export default function Mapcontainer(props) {
    const { BaseLayer } = LayersControl;
    
    return (
       <MapContainer 
        className={props.className}
        zoom={props.zoom}
        center={props.center}
       >
              <LayersControl>
            
            
            <BaseLayer  name = 'Base Map'>       
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    />
            </BaseLayer>  
            <BaseLayer checked  name = 'opentopomap'>       
            <TileLayer
                   attribution= 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
            />
            </BaseLayer>  
            {props.children}
            </LayersControl>
       </MapContainer>
    )
}
