import passport from "passport";
import {findAllCustomerOrders,findCustomerByEmail,updateCustomer,updatePassword,findCustomerById,updateNewPassword,
} from "../db/customer.js";

import { createToken, hashPassword } from "../token/token.js";

import { sendTokenByEmail } from "../notification/email.js";

export const findCustomerOrders = async (req, res) => {
  try {
    res.send(await findAllCustomerOrders());
  } catch (err) {
    res.send(err);
  }
}

export const login = async (req, res, next) => {
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
          res.status(200).json(await createToken(await findCustomerByEmail(req.body.email)));
        } catch (error) {
          res.send(error);
        }
      });
    }
  })(req, res, next);
}

export const register = async (req, res, next) => {
  console.log("register")
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
          console.log("register user")
          let { username, email } = req.body;
          res.send(await updateCustomer(username, email));
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  })(req, res, next);
}

export const logout = (req, res) => {
  res.send("The user has been logge out");
}

export const resetpassword = async (req, res, next) => {
  try {
    const customer = await findCustomerByEmail(req.body.email);
    const token = await createToken(customer);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

export const forgotpassword = async (req, res) => {
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
}


export const passwordreset =async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) res.status(401).send(err);
    try {
      let {customer_id, password} = customer.customer;
      const hashedPassword = await hashPassword(password), customerr = await findCustomerById(customer_id), 
      result = await updateNewPassword(customerr, hashedPassword);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })(req, res, next);
}


export const reset = (req, res, next) => {
  passport.authenticate("bearer", (err, customer, info) => {
    if (err) res.status(401).send(err);
    res.send("password reset link a-ok");
  })(req, res, next);
}

export const updtePasswordByEmail = async (req, res, next) => {
  passport.authenticate("bearer", async (err, customer, info) => {
    if (err) res.status(401).send(err);
    try {
      const hashedPassword = await hashPassword(password), customer = await updatePassword(customer, hashedPassword);
      res.send("password reset");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })(req, res, next);
}

