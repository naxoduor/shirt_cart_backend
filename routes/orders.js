import express from "express";
const router = express.Router();
//const cache = require('../config/cache')
import { findAllOrders, findOrderDetailById, createOrder } from "../db/orders.js";



router.get("/", async (req, res) => {
  const orders = await findAllOrders();
  res.send(orders);
});

router.get("/order_details/:orderId", async (req, res) => {
  const {orderId} = req.params;
  res.send(await findOrderDetailById(orderId))
 
});

router.post("/", async (req, res) => {
  const {cartId, customerId, shippingId, taxId} = req.body.order
  res.send(await createOrder(cartId, customerId, shippingId, taxId))
});

export default router;
