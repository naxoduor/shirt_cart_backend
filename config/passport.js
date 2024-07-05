import passport from "passport";
import passportJWT from "passport-jwt";
// import LocalStrategy from "passport-local".Strategy;
import pkg from 'passport-local';
const {Strategy} = pkg;
import BearerStrategy from "passport-http-bearer";
import {secret} from './jwtConfig.js'
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import jwt from "jsonwebtoken";
import {
  createCustomer,
  findCustomerByEmail,
} from "../db/customer.js";
import { hashPassword, comparePasswords } from "../token/token.js";

passport.use(
  "register",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, username, password, done) => {
      let name = username;

      try {
        const { email, mobile } = req.body;
        const customer = await findCustomerByEmail(email);
        if (customer != null) {
          return done(null, false, {
            message: "username or email already taken",
          });
        }
        console.log("crete user")
        const hashedPassword = await hashPassword(password);
        const user = await createCustomer(name, hashedPassword, email, mobile);
        console.log("user created")
        return done(null, user);
      } catch (err) {
        console.log("error found", err)
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        console.log("find user in passport middleware");
        const user = await findCustomerByEmail(email);
        if (user === null) {
          console.log("user not found")
          return done(null, false, { message: "bad username" });
        }

        const response = await comparePasswords(password, user.password);
        if (response !== true) {
          console.log("passwords do not match")
          return done(null, false, { message: "passwords do not match" });
        }
        console.log("found user", user)
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "bearer",
  new BearerStrategy(function (token, done) {
    jwt.verify(token, "jwt-secret", function (err, customer) {
      if (err) {
        console.log("encountered error")
        console.log(token)
        console.log(err)
        return done(err);
      }
      console.log("log the customer")
      return done(null, customer ? customer : false);
    });
  })
);
