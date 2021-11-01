const mongoose = require('mongoose')

const countriesSchema = new mongoose.Schema({
    name: String,
    geometry: {
      type: {type: String},
      coordinates: {
        type: []
        
      }
    }
  });

  
  
  countriesSchema.index({ geometry: '2dsphere' });


module.exports = mongoose.model('countries', countriesSchema);