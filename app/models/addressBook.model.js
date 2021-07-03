/**
 * @module       AddressBook
 * @file         addressBook.models.js
 * @description  addressBookSchema holds the database Schema 
 * @author       Rakesh S R <rakeshsrking@gmail.com>
 * @since        03/07/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
//Authenticate password using bcrypt
const bcrypt = require('bcrypt');

const addressBookSchema = mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

addressBookSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
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

    /**
     * @description login person from the database
     * @param loginData 
     * @param callback for service
     */
    loginPersonDetails = (loginData, callback) =>{
        AddressBook.findOne({'email': loginData.email}, (error, data) =>{
            if(error){
                return callback(error, null);
            }else if(!data){
                return callback("Invalid credentials..! Please re-enter", null);
            }
            return callback(null, data);
        })
    }
}

module.exports = new AddressBookModel();