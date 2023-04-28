import express from "express";
const router = express.Router();
import passport from "passport";
//const cache = require('../config/cache')
import {
  findAllCustomerOrders,
  findCustomerByEmail,
  updateCustomer,
  updatePassword,
  findCustomerById,
  updateNewPassword,
} from "../db/customer.js";

import { createToken, hashPassword } from "../token/token.js";

import { sendTokenByEmail } from "../notification/email.js";

router.get("/customer_orders", async (req, res) => {
  try {
    const customer_orders = await findAllCustomerOrders();
    res.send(customer_orders);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", (err, customers, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      if (info.message === "bad username") {
        console.log("bad username", info.message);
        res.status(401).send(info.message);
      } else {
        console.log("error 403", info.message);
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(customers, async () => {
        try {
          const customer = await findCustomerByEmail(req.body.email);
          const token = await createToken(customer)
          console.log("log the token")
          console.log(token)
          res.status(200).json(token);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      console.log("login the user");
      req.logIn(user, async () => {
        try {
          let { username, email } = req.body;
          res.send(await updateCustomer(username, email));
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.send("The user has been logge out");
});

router.post("/passwordreset", async (req, res, next) => {
  try {
    const customer = await findCustomerByEmail(req.body.email);
    const token = await createToken(customer);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const customer = await findCustomerByEmail(req.body.email);

    if (customer) {
      const token = await createToken(customer);
      result = await sendTokenByEmail(token);
      res.send(result);
    } else {
      res.status(404).json("email not in db");
    }
  } catch (err) {
    res.send("email not in db");
    console.log(err);
  }
});


router.post("/resetpassword", async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) res.status(401).send(err);
    try {
      let customer_id = customer.customer.customer_id;
      let password = "password";
      const hashedPassword = await hashPassword(password);
      const customerr = await findCustomerById(customer_id);
      const result = await updateNewPassword(customerr, hashedPassword);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })(req, res, next);
});

router.get("/reset", (req, res, next) => {
  passport.authenticate("bearer", (err, customer, info) => {
    if (err) res.status(401).send(err);
    res.send("password reset link a-ok");
  })(req, res, next);
});

router.put("/updatePasswordViaEmail", async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) res.status(401).send(err);
    try {
      const hashedPassword = await hashPassword(password);
      const customer = await updatePassword(customer, hashedPassword);
      res.send("password reset");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })(req, res, next);
});

export default router