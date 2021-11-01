import React from 'react'
import * as L from 'leaflet'

 const icon = L.divIcon({className: 'station', 
 html: "<div class='circle'></div>",
 iconSize: [20, 20]   
})

 export default icon;