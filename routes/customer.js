const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwtSecret = require('../config/jwtConfig')
//const cache = require('../config/cache')
const jwt = require('jsonwebtoken')
const Customer = require('../models').customer

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, customers, info) => {
        console.log("top request")
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            if (info.message === 'bad username') {
                console.log("bad username")
                res.status(401).send(info.message)
            } else {
                res.status(403).send(info.message)
            }
        } else {
            req.logIn(customers, () => {
                Customer.findOne({
                    where: {
                        email: req.body.email 
                    },
                }).then(customer => {
                    const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
                        expiresIn: 60 * 60, 
                    });
                    console.log(token)
                    res.status(200).json({token});
                });
            });
        }
    })(req, res, next);
});

router.post('/', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message)
        } else {
            req.logIn(user, error => {
                console.log(user);
                let { username, email } = req.body
                const data = {
                    username: username,
                    email: email
                };
                console.log(data)
                Customer.findOne({
                    where: {
                        name: data.username,
                    },
                }).then(customer => {
                    console.log("print the customer details")
                    console.log(customer)
                    customer.update({
                        name: data.username,
                        email: data.email
                    }).then(() => {
                        console.log('customer created in db');
                        //res.status(200).send({message: 'user created'})
                        res.send(user)
                    })
                })
            })
        }
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    console.log("log out the user")
   // console.log(req.body.customer.password)
    res.send("The user has been logge out")
})

router.get('/testingroute', (req, res) => {
    console.log("testing this route")
   // console.log(req.body.customer.password)
    res.status(400).send(new Error("found an error"))
})

module.exports = router