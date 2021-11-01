const express = require('express')
const mongoose = require('mongoose')


const app = express()
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

mongoose.connect('mongodb+srv://svinni:svinni1@cluster0.b4lxo.mongodb.net/viaduct?retryWrites=true&w=majority',
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