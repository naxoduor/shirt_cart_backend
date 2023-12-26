import express from "express";
const router = express.Router();
import {findCustomerOrders, login, register, logout,
   resetpassword, forgotpassword, passwordreset, reset, updtePasswordByEmail} from '../controllers/customer-controller.js'


router.get("/customer_orders", findCustomerOrders);

router.post("/login", login);

router.post("/", register);

router.get("/logout", logout);

router.post("/passwordreset", passwordreset);

router.post("/forgotpassword", forgotpassword);


router.post("/resetpassword", resetpassword);

router.get("/reset", reset);

router.put("/updatePasswordViaEmail",updtePasswordByEmail);

export default router