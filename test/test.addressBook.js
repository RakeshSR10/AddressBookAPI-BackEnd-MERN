//assertion library
let chai = require('chai');
let chaiHttp = require('chai-http');

//test http request
let server = require('../server');
let userInputData = require('./addressBookData.json');

//assertion library
chai.should();
chai.use(chaiHttp);

/**
 * POST request test
 * POST Person Login with Positive and Negative Test
 */
 describe('POST /personLogin', () => {
    it('It should POST Person Login Details ', (done) => {
        const personData = userInputData.personLoginPos
        chai.request(server)
            .post('/personLogin')
            .send(personData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Login Successfully...");
                res.body.should.have.property("token");
                if(err) {
                    return done(err);
                }
                done();
            });
    });

    it('It should POST Invalid password and fails to generate token', (done) => {
        const personData = userInputData.personLoginNeg
        chai.request(server)
            .post('/personLogin')
            .send(personData)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message").eql("Please enter your correct password...!");
                if(err) {
                    return done(err);
                }
                done();
            });
    });
});

/**
 * POST request test
 * Positive and Negative - Registration Test 
*/
describe('POST /personRegister', () => {
    it('It should POST New Person registered successfully', (done) => {
        let personRegData = userInputData.personRegister
        chai.request(server)
            .post('/personRegister')
            .send(personRegData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Person contact details added successfully");
                res.body.should.have.property("data").should.be.a('object');
                if(err) {
                    return done(err);
                }
                done();
            });
    }); 
     
    it('It should not be able make POST request for registration details', (done) => {
        let personRegData = userInputData.personRegisterNeg
        chai.request(server)
            .post('/personRegister')
            .send(personRegData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(false);
                res.body.should.have.property("message").eql("Email already in use");
                res.body.should.have.property("data").eql(null);
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it("It should not able to post request for registration details without firstName", (done) => {
        const personRegDataNoFirstName = userInputData.registerWithoutFirstName
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoFirstName)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"firstName\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
                done();
        })
    })

    it("It should not able to post request for registration details without lastName", (done) => {
        const personRegDataNoLastName = userInputData.registerWithoutLastName
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoLastName)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"lastName\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without email", (done) => {
        const personRegDataNoEmail = userInputData.registerWithoutEmail
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoEmail)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"email\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without password", (done) => {
        const personRegDataNoPassword = userInputData.registerWithoutPassword
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoPassword)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"password\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without address", (done) => {
        const personRegDataNoAddress = userInputData.registerWithoutAddress
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoAddress)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"address\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without city", (done) => {
        const personRegDataNoCity = userInputData.registerWithoutCity
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoCity)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"city\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without state", (done) => {
        const personRegDataNoState = userInputData.registerWithoutState
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoState)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"state\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without phone number", (done) => {
        const personRegDataNoPhoneNumber = userInputData.registerWithoutPhone
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoPhoneNumber)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"phone\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without zip", (done) => {
        const personRegDataNoZip = userInputData.registerWithoutZip
        chai.request(server)
            .post("/personRegister")
            .send(personRegDataNoZip)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"zip\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })
});

/**
 * GET API test for retrieve all persons
 */
 describe('Address Book API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/personLogin')
            .send(userInputData.personLoginPos)
            .end((error, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    /**
    * /GET request test- Get all employee data from database Test 
    */
     describe('GET /contacts', () => {
        it("It should get all the person contact details from database", (done) => {
            chai.request(server)
                .get('/contacts')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Details of all the Persons");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
    * /GET request test - Get single person contact details from database Test 
    */
     describe('GET /contacts/:_id', () =>{
        it("It should retrieve single person contact details using valid token and id", (done) =>{
           chai.request(server)
                .get('/contacts/60e12345743ff526801051ed')
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully retrieving single person contact details");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    describe('GET /contacts/:_id', () =>{
        it("It should not retrieve single person contact details using valid token and invalid id", (done) =>{
           chai.request(server)
                .get('/contacts/60e12345743ff526801051')
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Error while retrieving single person contact details");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /PUT request test
     * Update employee details into database for existing employee test
     */
     describe('PUT /update/:_id', () =>{
        it("It should able to update existing person contact details using id", (done) =>{
            chai.request(server)
                .put('/update/60e12345743ff526801051ed')
                .send(userInputData.personContactUpdate)
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Person Contact details updated successfully");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("It should not able update without firstName empty", (done) => {
            chai.request(server)
                .put('/update/60e12345743ff526801051ed')
                .send(userInputData.personContactUpdateNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    })

    /**
     * /DELETE request test - Deleting employee details from database using their Id
     */
     describe('DELETE /delete/:_id', () => {
        it("It should able to delete person contact details using valid token and Id successfully", (done) =>{
            chai.request(server)
                .delete('/delete/60e12345743ff526801051ed')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql('Successfully deleted person contact details');
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("It should not able to delete with invalid id", (done) => {
            chai.request(server)
                .delete('/delete/60e12345743ff52680')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Given Person not found");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    })
    
 });