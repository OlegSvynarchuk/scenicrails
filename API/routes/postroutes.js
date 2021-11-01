const express = require('express')
const fs = require('fs')
const router = express.Router()
const trainLine = require('../mongoose/routeschema')
const query_overpass = require( "query-overpass");





router.post('/api/route',  (req, res, next) => {
  let routeName = req.body.routeName.split(".")[0]
  getFile(__dirname + `/${req.body.routeName}`)
  .then(response => findStations(response))
  .then(data => saveRoute(data, routeName, res))
  .then(response => res.status(200).send(response)).catch(err => res.status(400).send(err))
  })

module.exports = router;

function getFile(fileName) {
  return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', async (err, data) => {
          if(err) {
              reject (err)
              return
          }
          
              resolve(formatRouteData(JSON.parse(data)))
          
      })
  })
}

function formatRouteData(route) {
    
  const originalCoords = route.features[0].geometry.coordinates
  
  let reversedFlatCoords = originalCoords.map(el => {
       return (
         [el[0], el[1]] = [el[1], el[0]]
       )
     }).flat() 
     
     
   return {
      flatCoords: reversedFlatCoords,
      coords: originalCoords
   }
}
function formatStations(list) {
  return list.map(station => {
    
    let st = {
      id: station.id,
      names: Object.keys(station.properties).filter(key => key.includes('name')).reduce((acc, curr) => {
        return(
          {...acc, [curr] : station.properties[curr]}
         )
      }, {}),
      geometry: {...station.geometry, coordinates: [station.geometry.coordinates[0],  
       station.geometry.coordinates[1]] =  [station.geometry.coordinates[1],
       station.geometry.coordinates[0]]
     },
     stop_type: station.properties.railway,
    
    }
    return st
  })
  
}

function findStations(coordsObj) {
  return new Promise((resolve, reject) => {
    query_overpass(
     
      `[timeout: 25][out:json]; (
          nwr[railway='station'](around:100, ${coordsObj.flatCoords});
          nwr[railway='halt'](around:100, ${coordsObj.flatCoords});
          ); out center;`,
      (error, data) => {
        if (error) {
          reject(error);
        }

        if (data) {
          
          resolve({lineString: coordsObj.coords, stations: formatStations(data.features)});
        }
      },
      { flatProperties: true }
    );
  });
}

async function saveRoute(data, routeName = 'valjevo') {
    let formattedRoute = {
      name: routeName,
      location:  {type: "LineString", coordinates: data.lineString},
      stations: data.stations
    }
    let routeDocument = new trainLine(formattedRoute)
    try{
      let response = await routeDocument.save()
      return response
    } catch(err) {
      return err
    }
    
}