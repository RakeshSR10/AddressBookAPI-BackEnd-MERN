/**
 * @module       addressBookController
 * @file         addressBook.controller.js
 * @description  addressBookController class holds API methods for routing
 * @author       Rakesh S R <rakeshsrking@gmail.com>
 * @since        03/07/2021 
 ------------------------------------------------------------------------------*/

//declared a constant variable to assign a imported class from services
const ContactService = require('../service/contact.js')
const validateSchema = require('../middleware/contactValidation.js')

//create class to write function
//controller will handling the Register and Login operations
class ContactController {
    /**
     * @description Create and save addressBook and sending response to service
     * @method Registration API to save the addressBook
     * @param req,res for service
     */
     create = (req, res) => {
        // Validate request
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            return res.status(400).send({
                message: validation.error.details[0].message})
        }

        //Create contact
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            phone: req.body.phone,
            email: req.body.email,
            zip: req.body.zip
        }

        ContactService.addPersonDetails(contact, (error, data) =>{
            if(error){
                return res.status(400)
                .send({
                    success: false,
                    message: "Email already in use",
                    data: null
                })
            }else {
                return res.status(200).send({
                    success: true,
                    message: 'Person contact details added successfully',
                    data: data
                })
            }
        })
    }

    /**
     * @description retrieve all person contacts data in this function
     * @param req, res, for ContactService
     * @method getAllContacts
     */
    getAllContacts = (req, res) =>{
        ContactService.getAllPersonContacts((error, data) => {
            if(error) {
                return res.status(400)
                       .send({
                           success: false,
                           message: "Error while retrieving person contact details",
                           data: null
                       });
            } else {
                return res.status(200).send({
                    success: true,
                    message: "Details of all the Persons",
                    data: data
               })
            }
        })
    }

    /**
      * @description get person contact data by using contactId
      * @param req, res
      */
    getPersonById = (req, res) => {
        let contactId = req.params
        ContactService.getPersonDetailsById(contactId, (error, data) => {
            if(error){
                return res.status(400)
                  .send({
                          success: false,
                          message: "Error while retrieving single person contact details",
                          data: null
                      })
            } else {
                return res.status(200)
                  .send({
                      success: true,
                      message: "Successfully retrieving single person contact details",
                      data: data
                })
            }
        })
    } 

    /**
     * @description updating person contact data using Id
     * @method update
     * @param req,res for service
    */
    update = (req, res) => {
        const validation = validateSchema.validate(req.body)
        if(validation.error){
           return res.status(400).send({message: validation.error.details[0].message})
        }   
    
        const contact = {
            _id: req.params._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            phone: req.body.phone,
            email: req.body.email,
            zip: req.body.zip
        } 

        var contactId = req.params

        ContactService.updatePersonDetailsById(contactId, contact,(error, data) => {
            if(error){
                return res.status(404).
                    send({
                        success: false, 
                        message: "Error occurred while updating data", 
                        data: null
                    })
            }else{
                return res.status(200).
                    send({
                        success: true, 
                        message: "Person Contact details updated successfully",
                        data: data
                    })
            }
        })
    }

    /**
     * @description deleting user data using Id
     * @method delete
     * @param req,res for service
    */
    delete = (req, res) => {
        var contact = req.params
        ContactService.deletePersonDetailsById(contact, (error, data) => {
            if(error){
                return res.status(404).
                send({
                    success: false,
                    message: "Given Person not found",
                    data: data
                })
            }else {
                return res.status(200).send
                ({
                    success: true,
                    message: "Successfully deleted person contact details",
                    data: data
                })
            }
        })
    }
}

module.exports = new ContactController();