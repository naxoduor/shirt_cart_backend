import express from "express"
const router = express.Router();
//const cache = require('../config/cache')
import {
  generateUniqueId,
  addItemToCart,
  findCartById,
  updateCartById,
  removeProductFromCart
} from "../db/shoppingcart.js";

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
  console.log("add item to cart")
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
  let inCartId = req.params.cart_id;
  const cartList = await  findCartById(inCartId)
  res.send(cartList);
});

router.put("/update/:joined_ids", async (req, res) => {
  let joined_ids = req.params.joined_ids;
  let arrc = joined_ids.split("&");
  let inItemId = arrc[0];
  let cartId = arrc[arrc.length - 1];
  let cartList = [];
  let { quantity } = req.body.params;
  const shopping_cart = await updateCartById(
    inItemId,
    cartId,
    cartList,
    quantity
  );
  res.send(shopping_cart);
});

router.delete("/removeProduct/:joined_ids", async (req, res) => {
  let joined_ids = req.params.joined_ids;
  let arrc = joined_ids.split("&");
  let inItemId = arrc[0];
  let cartId = arrc[arrc.length - 1];
  const cart = await removeProductFromCart(inItemId, cartId)
  res.send(cart)
  
});

export default router