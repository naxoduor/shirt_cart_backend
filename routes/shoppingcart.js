import express from "express"
const router = express.Router();
//const cache = require('../config/cache')
import {generateUniqueId,addItemToCart,findCartById,updateCartById,removeProductFromCart} from "../db/shoppingcart.js";

router.get("/", (req, res) => {
  res.send("success");
});

router.get("/generateUniqueId", async (req, res) => {
  res.send(await generateUniqueId());
});

router.get("/add", (req, res) => {
  res.send("success");
});

router.post("/add", async (req, res) => {
  let { cartId, productId, quantity } = req.body.params;
  try{
    const shopping_cart = await addItemToCart(cartId, productId, quantity);
    res.send(shopping_cart);
  }
  catch(error){
    console.log(error)
    res.send(error)
  }
});

router.get("/:cart_id", async (req, res) => {
  let {cart_id} = req.params;
  const cartList = await  findCartById(cart_id)
  res.send(cartList);
});

router.put("/update/:joined_ids", async (req, res) => {
  let {joined_ids} = req.params, arrc = joined_ids.split("&"), item_id = arrc[0], cart_id= arrc[arrc.length - 1];
  let { quantity } = req.body.params;
  const shopping_cart = await updateCartById(item_id,cart_id,quantity);
  res.send(shopping_cart);
});

router.delete("/removeProduct/:joined_ids", async (req, res) => {
  let {joined_ids} = req.params;
  let arrc = joined_ids.split("&"), item_id = arrc[0], cart_id = arrc[arrc.length - 1];
  const cart = await removeProductFromCart(item_id, cart_id)
  res.send(cart)
  
});

export default router