import express from "express";

import {getProducts,getProductsAsAdmin, getByDepId, getByCatId, getProductsByCategoryByPage, getProductsByDepartmentByPage,
  addProd, updateProd, getSearchProds, getProductById
 
} from "../controllers/products_controller.js";

const router = express.Router();

router.get("/", getProducts)

router.get("/:product_name/:product_id", getProductById)

router.get("/productsAsAdmin", getProductsAsAdmin)

router.get("/inDepartment/:department_id",getByDepId)

router.get("/inCategory/:category_id",getByCatId)

router.post('/inCategory/pagination/:category_id', getProductsByCategoryByPage)

router.post('/inDepartment/pagination/:department_id',getProductsByDepartmentByPage)

router.post('/search*', getSearchProds)

router.post('/addproduct',addProd)

router.put('/updateproduct',updateProd)

export default router;
