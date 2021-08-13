/**
 * @module       AddressBook
 * @file         addressBook.models.js
 * @description  contactSchema holds the database Schema 
 * @author       Rakesh S R <rakeshsrking@gmail.com>
 * @since        03/07/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required : true 
    },
    city: {
        type: String,
        required : true   
    },
    state: {
        type: String,
        required : true    
    },
    phone: {
        type: String,
        required : true   
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    zip: {
        type: String,
        required : true
    }
},{
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema);

class ContactModel {
    /**
     * @description add person in the database
     * @param contact
     * @param callback
     */
    addPersonDetails = (contact, callback) => {
        const contactSchema = new Contact({
            firstName: contact.firstName,
            lastName: contact.lastName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            phone: contact.phone,
            email: contact.email,
            zip: contact.zip,
            password: contact.password
        });
        contactSchema.save(callback)
    };

    /**
     * @description find all person contacts from the database
     * @method find()
     * @param callBack for service
     */
    findAll = () => {
        try{
            return Contact.find().then((data) => {
                if(data){
                    return data;
                } else {
                    return null;
                }
            }).catch((error) => {
                return error;
            })
        } catch (error){
            return error;
        }
        // Contact.find({}, (error, data) => {
        //     if(error) {
        //         return callback(error, null);
        //     } else {
        //         return callback(null, data);
        //     }
        // })
    }

    /**
     * @description find person by id from the database
     * @param findOne
     * @param callback for service
    */
    findOne = async (contact) => {
        try{
            const singlePerson = await Contact.findById({'_id': contact._id});
            return singlePerson;
        } catch(error) {
            return error;
        }  
    }

    /**
     * @description find person by id and update in the database
     * @param updateById
     * @param callback for service
    */
    updateById = (_id, contact, callback) => {
        Contact.findByIdAndUpdate({'_id': contact._id}, {
            firstName: contact.firstName,
            lastName: contact.lastName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            phone: contact.phone,
            email: contact.email,
            zip: contact.zip,
            password: contact.password
        }, {new : true}, (error, data) => {
            return((error) ? (callback(error, null)) : (callback(null, data)));
        });
    }

    /**
     * @description find person by id and delete in the database
     * @param deleteById
     * @param callback for service
     */
    deleteById = (contact, callback) => {
        Contact.findByIdAndRemove(contact._id, (error, data) => {
            if(error){
                return callback(error, null)
            }else{
                return callback(null, data)
            }   
        })
    }
}

module.exports = new ContactModel();