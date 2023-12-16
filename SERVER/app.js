const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');


app.use(express.json()); // parse incoming requests of content-type - application/json to object
app.use(cors());
console.log("helllo")
const Controller = require('./Controller');

 mongoose.connect(process.env.MONGO_DB).then(() => {
     console.log("Connected to MongoDB")
 })
app.use('/', Controller);
app.listen(8000, () => {
    console.log('Server is running on port 8000');
  

});