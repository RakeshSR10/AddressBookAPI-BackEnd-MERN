/**
 * @file          database.config.js
 * @description   connection details of the mongoDB
 * @author        Rakesh S R <rakeshsrking@gmail.com>
 * @since         03/07/2021
 */

 const mongoose = require("mongoose");
 require('dotenv').config();
 
 mongoose.Promise = global.Promise;
 
 // Connecting to the database
 mongoose.connect(process.env.URL, { 
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
     useCreateIndex: true,
     useFindAndModify: false
     })
     .then(() => { console.log("Successfully connected to the database"); })
     .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                     process.exit();
 });