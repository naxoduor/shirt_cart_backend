const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwtSecret = require('../config/jwtConfig')
const nodemailer = require('nodemailer')
//const cache = require('../config/cache')
const jwt = require('jsonwebtoken')
const Customer = require('../models').customer
const bcrypt = require('bcryptjs');
// const customer = require('../models/customer')
const order = require('../models').order
const BCRYPT_SALT_ROUNDS = 12;

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: '',
        user: '',
        clientId: '',
        clientSecret: '',
        refreshToken: '',
    }   
  });


  router.get('/customer_orders', async (req, res)=>{
    console.log("get orders")
    try {
        const customer_orders=await Customer.findAll({
            include: {
                model: order
            }
        })
        res.send(customer_orders)
    }
    catch(err){
        res.send(err)
    }
})

router.post('/login', async (req, res, next) => {
    console.log("login the given user")
    passport.authenticate('login', (err, customers, info) => {
        if (err) {
            console.error(`error ${err}`);
        }   
        if (info !== undefined) {
            console.log("error bad info")
            if (info.message === 'bad username') {
                console.log("bad username", info.message)
                res.status(401).send(info.message)
            } else {
                console.log("error 403", info.message)
                res.status(403).send(info.message)
            }
        } else {
            req.logIn(customers, async () => {
                try {
                    const customer =await Customer.findOne({
                        where: {
                            email: req.body.email 
                        },
                    })
                    const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
                        expiresIn: 60 * 60, 
                    });
                    res.status(200).json(token);
                }
                catch(error){
                    console.log(error)
                    res.send(error)
                }
                
                })
        }
    })(req, res, next);
});

router.post('/', async (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message)
        } else {
            console.log("login the user")
            req.logIn(user, async () =>{
                try {
                    console.log("try statement")
                    let { username, email } = req.body
                    const data = {
                        username: username,
                        email: email
                    };
                    const customer = await Customer.findOne({
                        where: {
                            name: data.username,
                        },
                    })
                    const userr = await customer.update({
                        name: data.username,
                        email: data.email
                    })
                    res.send(userr)
                    console.log("send the updated user")
                    console.log(userr)
                }
                catch(error){
                    console.log("catch statement, error during register and login")
                    console.log(error)
                    res.send(error)
                }
            })
        }
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.send("The user has been logge out")
})

router.post('/passwordreset', async (req, res, next) => {    
    try {
        const customer=await Customer.findOne({
            where: {
                email: req.body.email 
            },
        })
        const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
            expiresIn: 60 * 60, 
        });
        res.status(200).json({token})
    }   
    catch(err) {
        console.log(err)
        res.send(err)
    }
});

router.post('/forgotpassword', async (req, res) =>{
    
    try {
    const customer  = await Customer.findOne({
        where:{
            email: req.body.email
        }
    })
        if(customer){
        const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
            expiresIn: 60 * 60, 
        });

            transporter.sendMail({
            from: '"Nax Oduor 👻" <naxoduor7@gmail.com>',
            to: "naxochieng86@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<h1>Please click the below link to reset password!</h1></br><p><a href="http://127.0.0.1/resetpassword/${token}">Click here to change password</a></p>`
          }, function(err, info){
        if(err){
        res.status(404).json("email not in db")
        }
        else{
        res.send("recovery email sent")
        }
        });
    }
    else{
        res.status(404).json("email not in db")
    }
   
}
catch(err){
    res.send("email not in db")
    console.log(err)
}
})

router.post('/resetpassword', async (req, res, next) => {
    passport.authenticate('bearer', async (err, customer, info) => {
        if(err)
        res.status(401).send(err)
        try{
            let customer_id=customer.customer.customer_id
            let password="password";
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            const customerr = await Customer.findOne({
            where:{
                customer_id:customer_id
            }
        })

        const customer = await customerr.update({
                password: hashedPassword
            })
        res.send("password has been reset")
        }
        catch(error){
            console.log(error)
            res.send(error)
        }
        
    })(req, res, next);
});

router.get('/reset', (req, res, next)=> {
    passport.authenticate('bearer', (err, customer, info)=>{
        if(err)
        res.status(401).send(err)
        res.send("password reset link a-ok")
    })(req, res, next)
})

router.put('/updatePasswordViaEmail', async(req, res, next)=>{
      passport.authenticate('bearer',  async(err, customer, info) => {
        if(err)
        res.status(401).send(err)
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            const customerr = await customer.update({
            name: username,
            password: hashedPassword
        })
        res.send("password reset")
        }
        catch(error){
            console.log(error)
            res.send(error)
        }
    })(req, res, next)
})




module.exports = router
