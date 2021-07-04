//importing controller to access functionality 
const Controller = require('../controller/addressBook.controller.js')

//routes are used for handling http patterns
module.exports = (app) => {

    //Creating API for Employee Registration
    app.post('/personRegister', Controller.Registration);

    //Creating API for Employee Registration
    app.post('/personLogin', Controller.Login);

    //API for retrieve all contact details of persons from addressBook database
    app.get('/contacts', Controller.getAllContacts);

    //API for retrieve single person contact data
    app.get('/contacts/:_id', Controller.getPersonById);

    //API for update person contact details using Id
    app.put('/update/:_id', Controller.update);

    //API for delete person contact details from database using Id
    app.delete('/delete/:_id', Controller.delete);

}