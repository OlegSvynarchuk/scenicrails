const express = require('express')
const countries = require( './countries.json')
const router = express.Router()
const c = require('../mongoose/countriesschema')
const fs = require('fs')
var mongoose = require('mongoose')


mongoose.connect('mongodb+srv://svinni:svinni1@cluster0.b4lxo.mongodb.net/viaduct?retryWrites=true&w=majority');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


    let formattedCountries = countries.features.map(item => {
  return {
    name: item.properties.ADMIN,
    geometry: item.geometry
  }

})

db.once('open', function() {
  console.log("Connection Successful!");
   
 

  // compile schema to model
 

  // a document instance


  // save model to database
  c.insertMany(formattedCountries, function (err, book) {
    if (err) return console.error(err);
    console.log(book.name + " saved to bookstore collection.");
  });
   
});

