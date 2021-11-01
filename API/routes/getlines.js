const express = require('express')
const router = express.Router()
const util = require('util')
const Routes = require('../mongoose/routeschema')
const countries = require('../mongoose/countriesschema')


router.get('/api/getlines', async(req, res) => {
    try {
        const routes = await Routes.find()
        
        
        res.status(200).send(routes)
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;