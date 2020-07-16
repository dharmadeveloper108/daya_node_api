const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// db configuration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the db");
}).catch(err => {
    console.error('Connection failed. Exiting... ', err);
    process.exit();
})

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "A wholesome message",
        "nationality": "Cuba",
        "age": 88
    })
});

// listen for requests
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});