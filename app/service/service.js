const addressBookModel = require('../models/addressBook.model.js');

class AddressBookDataService {
    /**
     * @description Create and save person contact then send response to controller
     * @method createAddDetails to save the person contact
     * @param callback callback for controller
     */
     addPersonDetails = (contact, callback) => {
        addressBookModel.addPersonDetails(contact, (error, data) =>{
            return error ? callback(error, null) : callback(null, data);
        });
    }

    /**
     * @description sends the info to loginApi in the controller
     * @method loginPersonDetails
     * @param callback callback for controller
    */
    loginPersonDetails = (loginData, callback) => {
        addressBookModel.loginPersonDetails(loginData, (error, data) =>{
            if(error){
                return callback(error, null);
            } else if(loginData.password === data.password){
                return (data) ? callback(null, data) : callback(error, null);
            }
            return callback("Please enter your correct password...!", error);
        })
    }
}
//exporting the class to utilize function created in this class
module.exports = new AddressBookDataService();