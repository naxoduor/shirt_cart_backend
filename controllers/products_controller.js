import {getAllProducts,getAllProductsAsAdmin,getByDepartmentId,getByCategoryId,getProductsByCategoryByPagination,
    getProductsByDepartmentByPagination,getSearchProducts,setRabbitQueues,addProduct,updateProduct
  } from "../db/products.js";

export const  getProducts = async (req, res) => {
    try {
      const result = await getAllProducts();
      res.send(result);
    } catch (error) {
      console.log("Experienced this error", error);
      res.send(error);
    }
}

export const getProductsAsAdmin = async (req, res) => {
    try {
      const result = await getAllProductsAsAdmin();
      res.send(result);
    } catch (error) {
      console.log("Experienced this error", error);
      res.send(error);
    }
}

export const getByDepId =  async (req, res) => {
    let {department_id} = req.params;
    try {
      const products = await getByDepartmentId(department_id);
      res.send(products);
    } catch (error) {
      res.send(error);
    }
}

export const getByCatId = async (req, res) => {
    let {category_id} = req.params;
    try {
      const products = await getByCategoryId(category_id);
      res.send(products);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}

export const getProductsByCategoryByPage = async (request, response) => {
    let { category_id, productsPerPage, startItem } = request.body.params
    try {
      const products = await getProductsByCategoryByPagination(category_id, productsPerPage,startItem)
      res.send(products)
    }
    catch(error){
      console.log(error)
      res.send(error)
    }
}

export const getProductsByDepartmentByPage = async (request, response) => {
    let { department_id, productsPerPage, startItem } = request.body.params
    try {
      const products = await getProductsByDepartmentByPagination(department_id, productsPerPage, startItem)
      res.send(products)
      }
    
    catch(error){
      console.log(error)
      res.send(error)
    }
}

export const getSearchProds = async (request, response) => {

    let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
    try {
      const products = await getSearchProducts(inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem)
      res.send(products)
    }
  
    catch(error){
      console.log(error)
      res.send(error)
    }
}


export const addProd = async (req,res)=>{
    try {
    const product = await addProduct(name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display)
    res.send(product)
    }
  
    catch(error){
      console.log(error)
      res.send(error)
    }
}

export const updateProd = async (req,res)=>{
    try {
    const {product_id, name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display}=req.body.product
    const product = await updateProduct(product_id, name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display)
    res.send(product)
    }
  
    catch(error){
      console.log(error)
      res.send(error)
    }
}