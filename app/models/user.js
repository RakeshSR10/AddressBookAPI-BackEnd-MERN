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
    email: {
        type: String,
        required: true,
        unique: true
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
            email: contact.email,
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