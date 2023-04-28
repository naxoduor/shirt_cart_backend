
import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/', (req, res, next) => {
    passport.authenticate('bearer', (err, customer, info) => {
        if(err)
        res.status(401).send(err)
        let result ={}
        result.mob_phone=customer.customer.mob_phone
        result.customer_id=customer.customer.customer_id
        result.role=customer.customer.role
        result.name=customer.customer.name
        res.send(result)        
    })(req, res, next);
});

export default router