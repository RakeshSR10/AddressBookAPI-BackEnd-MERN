const ContactModel = require('../models/addressBook.contact.js');
const logger = require('../../logger/logger.js')

class ContactService {
    /**
     * @description Create and save person contact then send response to controller
     * @method createAddDetails to save the person contact
     * @param callback callback for controller
     */
     addPersonDetails = (contact, callback) => {
        try{
            ContactModel.addPersonDetails(contact, (error, data) =>{
                if(error) {
                    logger.error('Contact create service --', error);
                    return callback(error, null);
                }
                logger.info('Contact create service --', data);
                return callback(null, data);
                // return error ? callback(error, null) : callback(null, data);
            });
        } catch (error) {
            callback(error || 'Some error occurred...!', null);
        }
    }
    
    /**
     * @description send person contact Information to read in the controller
     * @method getAllPersonContacts
     * @param callback, callback for controller 
     */
    getAllPersonContacts = () => {
        try{
            return ContactModel.findAll().then((data) =>{
                if(data){
                    return data;
                } else{
                    return null;
                }
            }).catch((err) => {
                return err;
            })
        } catch (err){
            return err;
        }
        // ContactModel.findAll((error, data) => {
        //     return (error) ? callback(error, null) : callback(null, data);
        // })
    }

    /**
     * @description function handles to get single person contact data
     * @param  personContactInfo 
     * @param  callBack 
    */
    getPersonDetailsById = async (contact) => {
        try{
            let data = await ContactModel.findOne(contact);
            return data;
        } catch (error) {
            return error;
        }
        // ContactModel.findOne(contact, (error, data) => {
        //     return (error) ? callback(error, null) : callback(null, data);
        // });
    }

    /**
     * @description sends the info to update in the controller
     * @method updatePersonDetailsById
     * @param callback callback for controller
    */
    updatePersonDetailsById = (contactId, contact, callback) => {
        try {
            ContactModel.updateById(contactId, contact, (error, data) => {
                logger.info('Service data -->', data);
                return err ? callback(err, null) : callback(null, data);
            });
        } catch (error) {
            callback(error || 'Some error occurred..!', null);
        }
        // ContactModel.updateById(contactId, contact, (error, data) => {
        //     return (error) ? callback(error, null) : callback(null, data)
        // })
    }

    /**
     * @description sends the info to delete in the controller
     * @method deletePersonDetailsById
     * @param callback callback for controller
    */
    deletePersonDetailsById = (contact, callback) => {
        ContactModel.deleteById(contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
}
//exporting the class to utilize function created in this class
module.exports = new ContactService();