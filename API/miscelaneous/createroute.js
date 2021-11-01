const fs = require('fs')
const query_overpass = require( "query-overpass");
const trainLine = require('../mongoose/routeschema')

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
    let coords = route.features[0].geometry.coordinates.map(el => {
         return (
           [el[0], el[1]] = [el[1], el[0]]
         )
       })
     let flatCoords = coords.flat()  
       const formattedRoute = {
          coords,
         flatCoords
     }
     return flatCoords
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

 function findStations(lineString) {
    return new Promise((resolve, reject) => {
      query_overpass(
       
        `[timeout: 25][out:json]; (
            nwr[railway='station'](around:100, ${lineString});
            nwr[railway='halt'](around:100, ${lineString});
            ); out center;`,
        (error, data) => {
          if (error) {
            reject(error);
          }
  
          if (data) {
            
            resolve({lineString: lineString, stations: formatStations(data.features)});
          }
        },
        { flatProperties: true }
      );
    });
  }

  function saveRoute(data, routeName = 'valjevo') {
      let formattedRoute = {
        name: routeName,
        location:  {type: "LineString", coordinates: data.lineString.reverse()},
        stations: data.stations
      }
      let routeDocument = new trainLine(formattedRoute)
      routeDocument.save()
  }

 

 getFile(__dirname + `/${req.body.routeName}`)
 .then(lineString => findStations(lineString))
 .then(data =>saveRoute(data))
 .then(data => console.log(data))
 .catch(err => console.log(err))