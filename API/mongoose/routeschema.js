const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    name: String,
    country: String,
    stations: [],
    location: {
      type: {
        type: String, 
        enum: ['LineString']
        
      },
      coordinates: {
        type: []
        
      }
    }
  });

  
  

routeSchema.index({location: '2dsphere'})


module.exports = mongoose.model('routes', routeSchema);