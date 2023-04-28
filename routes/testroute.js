import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/', (req, res, next) => {
    passport.authenticate('bearer', (err, user, info) => {
        if(err)
        res.status(401).send(err)
        res.send(user)        
    })(req, res, next);
});

export default router