/**
 * @module       addressBookController
 * @file         addressBook.controller.js
 * @description  addressBookController class holds API methods for routing
 * @author       Rakesh S R <rakeshsrking@gmail.com>
 * @since        03/07/2021 
 ------------------------------------------------------------------------------*/

//declared a constant variable to assign a imported class from services
const addressBookService = require('../service/service')
const validateSchema = require('../middleware/addressBook.validation.js')

//create class to write function
//controller will handling the Register and Login operations
class addressBookController {
    /**
     * @description Create and save addressBook and sending response to service
     * @method Registration API to save the addressBook
     * @param req,res for service
     */
     Registration = (req, res) => {
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
            zip: req.body.zip,
            password: req.body.password
        }

        addressBookService.addPersonDetails(contact, (error, data) =>{
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
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
     Login = (req, res) => {
        const loginData = {
            email: req.body.email,
            password : req.body.password
        }
        addressBookService.loginPersonDetails(loginData, (error, data) => {
            if(error){
                return res.status(400).send({success: false, message: error, data: null})
            }
            else{
                return res.status(200).send({success: true, message: "Login successfully", data: data})
            }
        })
    }
}

module.exports = new addressBookController();