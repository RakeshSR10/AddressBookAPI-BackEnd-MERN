//importing controller to access functionality 
const userController = require('../controller/user.js');
const contactController = require('../controller/contact.js');
const tokenCheck = require('../middleware/helper.js');

//routes are used for handling http patterns
module.exports = (app) => {

    //Creating API for Employee Registration
    app.post('/register', userController.Registration);

    //Creating API for Employee Registration
    app.post('/login', userController.Login);

    //Create new addressBook
    app.post('/addNew', tokenCheck.tokenDataChecker, contactController.create);

    //API for retrieve all contact details of persons from addressBook database
    app.get('/contacts', tokenCheck.tokenDataChecker, contactController.getAllContacts);

    //API for retrieve single person contact data
    app.get('/contacts/:_id', tokenCheck.tokenDataChecker, contactController.getPersonById);

    //API for update person contact details using Id
    app.put('/update/:_id', tokenCheck.tokenDataChecker, contactController.update);

    //API for delete person contact details from database using Id
    app.delete('/delete/:_id', tokenCheck.tokenDataChecker, contactController.delete);

}