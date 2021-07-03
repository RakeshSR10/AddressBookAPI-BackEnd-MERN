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
}
//exporting the class to utilize function created in this class
module.exports = new AddressBookDataService();