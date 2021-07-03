/**
 * @module       AddressBook
 * @file         addressBook.models.js
 * @description  addressBookSchema holds the database Schema 
 * @author       Rakesh S R <rakeshsrking@gmail.com>
 * @since        03/07/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');

const addressBookSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required : true,    
    },
    city: {
        type: String,
        required : true,      
    },
    state: {
        type: String,
        required : true,      
    },
    phone: {
        type: String,
        required : true,      
    },
    email: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required : true,     
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const AddressBook = mongoose.model('AddressBook', addressBookSchema);

class AddressBookModel {
    /**
     * @description add person in the database
     * @param contact
     * @param callback
     */
    addPersonDetails = (contact, callback) => {
        const addressBookSchema = new AddressBook({
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
        addressBookSchema.save(callback)
    };
}

module.exports = new AddressBookModel();