const jwtSecret = require('./jwtConfig')
const Customer = require('../models').customer
const BCRYPT_SALT_ROUNDS = 12;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            let name = username

            try {
                Customer.findOne({
                    where: {
                        [Op.or]: [
                            {
                                name,
                            },
                            { email: req.body.email },
                        ],
                    },
                }).then(customer => {
                    if (customer != null) {
                        console.log('username or rmail already taken');
                        return done(null, false, {
                            message: 'username or email already taken',
                        });
                    }
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        Customer.create({
                            name,
                            password: hashedPassword,
                            email: req.body.email,
                        }).then(user => {
                            console.log('user created');
                            return done(null, user);
                        });
                    });
                });
            }
            catch (err) {
                return done(err)
            }
        },
    ),
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        (req, password, done) => {
            try {
                Customer.findOne({
                    where: {
                        email: req.body.email
                    },
                }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'bad username' });
                    }
                    bcrypt.compare(password, user.password).then(response => {
                        if (response !== true) {
                            console.log('passwords do not match');
                            return done(null, false, { message: 'passwords do not match' });
                        }
                        console.log('user found and authenticated');
                        return done(null, user)
                    });
                });
            } catch (err) {
                return done(err)
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    id: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user)
                } else {
                    console.log('user not found in db');
                    done(null, false)
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);