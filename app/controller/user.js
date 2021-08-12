//declared a constant variable to assign a imported class from services
const Service = require('../service/user.js')
const validateSchema = require('../middleware/userValidation.js')

//create class to write function
//controller will handling the Register and Login operations
class AddressBookController {
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
            email: req.body.email,
            password: req.body.password
        }

        Service.addPersonDetails(contact, (error, data) =>{
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
        Service.loginPersonDetails(loginData, (error, token) => {
            return((error) ?
            res.status(400).send({
                success: false, 
                message: error
            }) : 
            res.send({
                success: true, 
                message: "Login Successfully...",
                token: token
            }));
        })
    }
}

module.exports = new AddressBookController();