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
    const shopping_cart = await addItemToCart(cartId, productId, quantity);
    res.send(shopping_cart);
  }
  catch(error){
    console.log(error)
    res.send(error)
  }
}

export const findCart = async (req, res) => {
  let {cart_id} = req.params;
  const cartList = await  findCartById(cart_id)
  res.send(cartList);
}

export const updateCart = async (req, res) => {
  let {joined_ids} = req.params, arrc = joined_ids.split("&"), item_id = arrc[0], cart_id= arrc[arrc.length - 1];
  let { quantity } = req.body.params;
  const shopping_cart = await updateCartById(item_id,cart_id,quantity);
  res.send(shopping_cart);
}

export const removeProduct = async (req, res) => {
  let {joined_ids} = req.params;
  let arrc = joined_ids.split("&"), item_id = arrc[0], cart_id = arrc[arrc.length - 1];
  const cart = await removeProductFromCart(item_id, cart_id)
  res.send(cart)
  
}
