const express = require('express')
const router = express.Router()
const util = require('util')
const Routes = require('../mongoose/routeschema')
const countries = require('../mongoose/countriesschema')


router.get('/api/getcountryroutes', async(req, res) => {
    
    try {
        const singleCountry = await countries.findOne({"name": {"$regex": req.query.countryName}})
        const reverseCountryCoordinates = revCoords(singleCountry)
        
        
      
        const routes = await Routes.find({
            location : {
                "$geoIntersects" : {
                    "$geometry" : {
                        type: singleCountry.geometry.type,
                        coordinates: reverseCountryCoordinates
                    }

                }
            }
        })
        
       
        
        res.status(200).send(routes)
    } catch (error) {
        console.log(error)
    }
    
})

function revCoords(country) {
    const reversedCoordinates = country.geometry.type === 'Polygon' ? country.geometry.coordinates[0].map(el => {
      return (
          [el[0], el[1]] = [el[1], el[0]]
        )
  }) : country.geometry.coordinates.map(el => {
      
      return (
          el.map(item => {
              return (
                  item.map(coord => {
                      return (
                          [coord[0], coord[1]] = [coord[1], coord[0]]
                      )
                  })
              )
          })
      )
  })
  return country.geometry.type === 'Polygon' ? [reversedCoordinates] : reversedCoordinates
  }

module.exports = router;