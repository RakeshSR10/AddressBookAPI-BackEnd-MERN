const addressBookModel = require('../models/addressBook.model.js');
const helperClass = require('../middleware/addressBook.helper.js');

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
            }else if(helperClass.bcryptDataCheck(loginData.password, data.password)){
                let token = helperClass.generateToken({loginData});
                return (token) ? callback(null, token) : callback(error, null);
            }
            return callback("Please enter your correct password...!", error)
        });
    }

    /**
     * @description send person contact Information to read in the controller
     * @method getAllPersonContacts
     * @param callback, callback for controller 
     */
    getAllPersonContacts = (callback) => {
        addressBookModel.findAll((error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
     * @description function handles to get single person contact data
     * @param  personContactInfo 
     * @param  callBack 
    */
    getPersonDetailsById = (contact, callback) => {
        addressBookModel.findOne(contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
     * @description sends the info to update in the controller
     * @method updatePersonDetailsById
     * @param callback callback for controller
    */
    updatePersonDetailsById = (contactId, contact, callback) => {
        addressBookModel.updateById(contactId, contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to delete in the controller
     * @method deletePersonDetailsById
     * @param callback callback for controller
    */
    deletePersonDetailsById = (contact, callback) => {
        addressBookModel.deleteById(contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
}
//exporting the class to utilize function created in this class
module.exports = new AddressBookDataService();