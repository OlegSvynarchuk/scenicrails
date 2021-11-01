const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGO_URI


const app = express()
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

mongoose.connect(uri,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
   }
)
.then(console.log('db connected'))
let db = mongoose.connection

app.use('/', require('./routes/postroutes.js'))
app.use('/', require('./routes/getlines.js'))
app.use('/', require('./routes/getcountries.js'))
app.use('/', require('./routes/getcountryroutes.js'))








app.listen(3000, () => console.log('viaduct working'))