import express from "express";
const router = express.Router();
//const cache = require('../config/cache')

import {
  findAllCategories,
  findAllCategoriesByDepartmentId,
  findTotalProductsByCategoryId,
  findProductsByCategoryId
} from "../db/categories.js";

router.get("/", async (req, res) => {
  try {
    const categories = await findAllCategories();
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/inDepartment/:id", async (req, res) => {
  let inDepartmentId = req.params.id;
  try {
    const categories = await findAllCategoriesByDepartmentId(inDepartmentId);
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/totalitems/:id", async (req, res) => {
  let inCategoryId = req.params.id;
  try {
    const list= findTotalProductsByCategoryId(inCategoryId)
    res.send(list);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/products/*", async (req, res) => {
  let { category_id, productsPerPage, startItem } = request.body.params;
  try {
    const products = await findProductsByCategoryId(category_id, productsPerPage, startItem)
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
