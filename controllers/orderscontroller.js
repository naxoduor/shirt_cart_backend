import express from "express";
const router = express.Router();
//const cache = require('../config/cache')
import { findAllOrders, findOrderDetailById, createOrder } from "../db/orders.js";

export const findOrders = async (req, res) => {
  const orders = await findAllOrders();
  res.send(orders);
}

export const findOrderById = async (req, res) => {
  const {orderId} = req.params;
  res.send(await findOrderDetailById(orderId))
 
}

export const createTheOrder = async (req, res) => {
  const {cartId, customerId, shippingId, taxId} = req.body.order
  res.send(await createOrder(cartId, customerId, shippingId, taxId))
}

