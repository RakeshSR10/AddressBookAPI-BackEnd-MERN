//importing controller to access functionality 
const userController = require('../controller/user.js');
const contactController = require('../controller/addressBook.contact.js');
const tokenCheck = require('../middleware/helper.js');

//routes are used for handling http patterns
module.exports = (app) => {

    //Creating API for Employee Registration
    app.post('/register', userController.Registration);

    //Creating API for Employee Registration
    app.post('/login', userController.Login);

    //Create new addressBook
    app.post('/addContact', tokenCheck.tokenDataChecker, contactController.createNewContact);

    //API for retrieve all contact details of persons from addressBook database
    app.get('/getAllContacts', tokenCheck.tokenDataChecker, contactController.getAllContacts);

    //API for retrieve single person contact data
    app.get('/getContact/:_id', tokenCheck.tokenDataChecker, contactController.getContactById);

    //API for update person contact details using Id
    app.put('/updateContact/:_id', tokenCheck.tokenDataChecker, contactController.updateContact);

    //API for delete person contact details from database using Id
    app.delete('/deleteContact/:_id', tokenCheck.tokenDataChecker, contactController.deleteContact);

}