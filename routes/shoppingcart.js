import express from "express"
const router = express.Router();
//const cache = require('../config/cache')
import {generateId, add, addItem, findCart, updateCart, removeProduct} from "../controllers/shoppingcart-controller.js";

router.get("/", (req, res) => {
  res.send("success");
});

router.get("/generateUniqueId", generateId);

router.get("/add", (req, res) => {
  res.send("success");
});

router.post("/add", addItem);

router.get("/:cart_id", findCart);

router.put("/update/:joined_ids", updateCart);

router.delete("/removeProduct/:joined_ids", removeProduct);

export default router