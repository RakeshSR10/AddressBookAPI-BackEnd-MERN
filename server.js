const express = require('express');
// Configuring the database
require('./config/database.config.js');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/swagger/swagger.json');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

const port = process.env.PORT
var options = {
    explorer: true
};

//swagger-ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// define a simple route
app.get('/', (req, res) => {
    res.send({"message": "Welcome to Address Book MERN"});
});

//Require addressBook routes
require('./app/routes/addressBook.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 4000");
});

module.exports = app;