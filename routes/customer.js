const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const jwt = require('jsonwebtoken')
const Customer = require('../models').customer

router.post('/login', (req, res) => {

    let email = req.body.customer.email
    Customer.findOne({ where: { email: email } })
        .then((user) => {
             jwt.sign({user:user}, 'secretkey', (err, token) =>{
                res.send({
                    token:token,
                    user:user
                })
            });
        })
        .catch(err => console.log(err))
    })


router.post('/', (req, res) => {

    let inName = req.body.user.name
    let inEmail = req.body.user.email
    let inPassword = req.body.user.password
    let inPassword2 = inPassword

    let errors = []

    if (!inName || !inEmail || !inPassword || !inPassword2) {
        errors.push({ msg: "please fill in all fields" })
    }

    if (inPassword !== inPassword2) {
        errors.push({ msg: "password do not match" })
    }

    if (inPassword.length < 6) {
        errors.push({ msg: "password should be atleast 6 characters" })
    }

    if (errors.length > 0) {
        res.status(404).send({
            errors,
            name: inName,
            email: inEmail,
            password: inPassword
        })
    }
    else {
        Customer.findOne({ where: { email: inEmail } })
            .then(user => {
                if (user) {
                    errors.push({ msg: "Email is already registered" })
                    res.status(404).send({
                        errors,
                        name: inName,
                        email: inEmail,
                        password: inPassword
                    })
                }
                else {
                    const customer = new Customer({
                        name: inName,
                        email: inEmail,
                        password: inPassword
                    })

                    customer.save()
                        .then(user => {
                            const token = jwt.sign(user, 'secret', (err, token) =>{
                                res.json({
                                    token:token
                                })
                        
                            });
                        })
                        .catch(err => console.log(err))
                }
            })
    }

})


function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()  
    } else {
        res.sendStatus(403)
    }
}

module.exports = router