const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwtSecret = require('../config/jwtConfig')
//const cache = require('../config/cache')
const jwt = require('jsonwebtoken')
const Customer = require('../models').customer

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, customers, info) => {
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.err(info.message);
            if (info.message === 'bad username') {
                res.status(401).send(info.message)
            } else {
                res.status(403).send(info.message)
            }
        } else {
            req.logIn(customers, () => {
                Customer.findOne({
                    where: {
                        email: req.body.customer.email 
                    },
                }).then(customer => {
                    const token = jwt.sign({ id: customer.id}, jwtSecret.secret, {
                        expiresIn: 60 * 60, 
                    });
                    res.status(200).send({
                        auth: true,
                        token,
                        message: 'user found & loged in',
                    });
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
                let { name, email } = req.body.user
                const data = {
                    name: name,
                    email: email
                };
                console.log(data)
                Customer.findOne({
                    where: {
                        name: data.name,
                    },
                }).then(customer => {
                    console.log(customer)
                    customer.update({
                        name: data.name,
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

module.exports = router