const express = require('express')
const router = express.Router()
const Routes = require('../mongoose/routeschema')
const countries = require('../mongoose/countriesschema')
const { connections } = require('mongoose')


router.get('/api/getcountries', async(req, res) => {
    try {
        const routesCount = await Routes.aggregate(
          [
            {
              $group: {
                _id: "$country",
                routesCount: {
                  $sum: 1
                }
              }
            }
          ]
        )
        const routesString = routesCount.map(el => el._id).join('|')
        const countriesResult = await countries.find({name: {$regex: routesString}}).lean()
        
        const c = countriesResult.map(country => {
          const reversedCoordinates =  revCoords(country)
         
          const countryObj = routesCount.find(r => country.name.includes(r._id))
          if(country.name.includes(countryObj._id)) {
            return (
              {...country, geometry: {...country.geometry, coordinates : reversedCoordinates},  routesCount: countryObj.routesCount, name: countryObj._id}
            )
          }
        })
        
        res.status(200).send({countries: c})
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
return reversedCoordinates
}

module.exports = router;