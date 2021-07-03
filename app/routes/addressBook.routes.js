//importing controller to access functionality 
const Controller = require('../controller/addressBook.controller.js')

//routes are used for handling http patterns
module.exports = (app) => {

    //Creating API for Employee Registration
    app.post('/personRegister', Controller.Registration);

}