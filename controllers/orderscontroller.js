import express from "express";
const router = express.Router();
//const cache = require('../config/cache')
import { findAllOrders, findOrderDetailById, createOrder } from "../db/orders.js";

export const findOrders = async (req, res) => {
  res.send(await findAllOrders());
}

export const findOrderById = async (req, res) => {
  res.send(await findOrderDetailById(req.params.orderId))
 
}

export const createTheOrder = async (req, res) => {
  const {cartId, transactionNumber} = req.body.order
  res.send(await createOrder(cartId, transactionNumber))
}

