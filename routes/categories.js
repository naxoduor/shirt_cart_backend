import express from "express";
const router = express.Router();
//const cache = require('../config/cache')

import {findAllCats, findAllCategoriesByDepId, findTotalProductsByCatId,
  findProdsByCatId,} from "../controllers/categories-controller.js";

router.get("/", findAllCats);

router.get("/inDepartment/:department_id", findAllCategoriesByDepId);

router.get("/totalitems/:category_id", findTotalProductsByCatId);

router.post("/products/*", findProdsByCatId);

export default router;
