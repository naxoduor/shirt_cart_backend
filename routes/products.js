import express from "express";

import {
  getAllProducts,
  getAllProductsAsAdmin,
  getByDepartmentId,
  getByCategoryId,
  getProductsByCategoryByPagination,
  getProductsByDepartmentByPagination,
  getSearchProducts,
  setRabbitQueues,
  addProduct
} from "../db/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getAllProducts();
    res.send(result);
  } catch (error) {
    console.log("Experienced this error", error);
    res.send(error);
  }
});

router.get("/productsAsAdmin", async (req, res) => {
  try {
    const result = await getAllProductsAsAdmin();
    res.send(result);
  } catch (error) {
    console.log("Experienced this error", error);
    res.send(error);
  }
});


router.get("/inDepartment/:id", async (req, res) => {
  let inDepartmentId = req.params.id;
  try {
    const products = await getByDepartmentId(inDepartmentId);
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/inCategory/:id", async (req, res) => {
  let inCategorytId = req.params.id;
  let key = `/products/inCategory/${inCategorytId}`;
  try {
    const products = await getByCategoryId(inCategorytId);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/inCategory/pagination/:id', async (request, response) => {
  let { category_id, productsPerPage, startItem } = request.body.params
  let key = `/products/inCategory/pagination${category_id}${startItem}`
  try {
    const products = await getProductsByCategoryByPagination(category_id, productsPerPage,startItem)
    res.send(products)
  }
  catch(error){
    console.log(error)
    res.send(error)
  }

})

router.post('/inDepartment/pagination/:id', async (request, response) => {
  let { department_id, productsPerPage, startItem } = request.body.params
  let key = `/products/inDepartment/pagination${department_id}${startItem}`
  try {
    const products = await getProductsByDepartmentByPagination(department_id, productsPerPage, startItem)
    res.send(products)
    }
  
  catch(error){
    console.log(error)
    res.send(error)
  }
})

router.post('/search*', async (request, response) => {

  let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
  let key = `/products/search/${searchString}$`

  try {
    const products = await getSearchProducts(inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem)
    res.send(products)
  }

  catch(error){
    console.log(error)
    res.send(error)
  }

})

router.get('/rabbit', async (req, res) => {

  let inDepartmentId = 1
  try {
   const result = await setRabbitQueues()
   res.send(result)
}
  catch(error){
    console.log(error)
    res.send(error)
  }
})

router.post('/addproduct',async (req,res)=>{
  try {
  const product = await addProduct(name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display)
  res.send(product)
  }

  catch(error){
    console.log(error)
    res.send(error)
  }
})

// module.exports = router

export default router;
