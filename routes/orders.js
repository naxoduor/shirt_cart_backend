import express from "express";
const router = express.Router();
//const cache = require('../config/cache')
import { findOrderById, createTheOrder, findOrders } from "../controllers/orderscontroller.js";

router.get("/",findOrders);

router.get("/order_details/:orderId", findOrderById);

router.post("/", createTheOrder);

export default router

