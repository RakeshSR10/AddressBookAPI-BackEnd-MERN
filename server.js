const express = require('express');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Address Book MERN"});
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});