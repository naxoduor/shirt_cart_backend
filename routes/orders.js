import express from "express";
const router = express.Router();
//const cache = require('../config/cache')
import { findAllOrders, findOrderDetailById, createOrder } from "../db/orders.js";



router.get("/", async (req, res) => {
  const orders = await findAllOrders();
  res.send(orders);
});

router.get("/order_details/:id", async (req, res) => {
  let orderId = req.params.id;
  res.send(await findOrderDetailById(orderId))
 
});

router.post("/", async (req, res) => {
  let inCartId = req.body.order.cartId;
  let inCustomerId = req.body.order.customerId;
  let inShippingId = req.body.order.shippingId;
  let inTaxId = req.body.order.taxId;
  res.send(await createOrder(inCartId, inCustomerId, inShippingId, inTaxId))
});

export default router;
