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

    let { name, email, password } = req.body.user
    let errors = []
    if (!name || !email || !password) {
        errors.push({ msg: "please fill in all fields" })
    }
    if (password.length < 6) {
        errors.push({ msg: "password should be atleast 6 characters" })
    }
    if (errors.length > 0) {
        res.status(404).send({
            errors,
            name: name,
            email: email,
            password: password
        })
    }
    else {
        Customer.findOne({ where: { email: email } })
            .then(user => {
                if (user) {
                    errors.push({ msg: "Email is already registered" })
                    res.status(404).send({
                        errors,
                        name: name,
                        email: email,
                        password: password
                    })
                }
                else {
                    const customer = new Customer({
                        name: name,
                        email: email,
                        password: password
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