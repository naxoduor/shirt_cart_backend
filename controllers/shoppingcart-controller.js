import express from "express"
const router = express.Router();
//const cache = require('../config/cache')
import {generateUniqueId,addItemToCart,findCartById,updateCartById,removeProductFromCart} from "../db/shoppingcart.js";

router.get("/", (req, res) => {
  res.send("success");
});

export const generateId = async (req, res) => {
  res.send(await generateUniqueId());
}

export const add = (req, res) => {
  res.send("success");
}

export const addItem = async (req, res) => {
  let { cartId, productId, quantity } = req.body.params;
  try{
    res.send(await addItemToCart(cartId, productId, quantity));
  }
  catch(error){
    res.send(error)
  }
}

export const findCart = async (req, res) => {
  res.send(await findCartById(req.params.cart_id))
}

export const updateCart = async (req, res) => {
  let {joined_ids} = req.params, arrc = joined_ids.split("&"), item_id = arrc[0], cart_id= arrc[arrc.length - 1];
  let { quantity } = req.body.params;
  res.send(await updateCartById(item_id,cart_id,quantity))
}

export const removeProduct = async (req, res) => {
  let {joined_ids} = req.params;
  let arrc = joined_ids.split("&"), item_id = arrc[0], cart_id = arrc[arrc.length - 1];
  res.send(await removeProductFromCart(item_id, cart_id))
  
}
