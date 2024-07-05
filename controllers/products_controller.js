import {getAllProducts,getAllProductsAsAdmin,getByDepartmentId,getByCategoryId,getProductsByCategoryByPagination,
    getProductsByDepartmentByPagination,getSearchProducts,setRabbitQueues,addProduct,updateProduct, getProductByPk
  } from "../db/products.js";

export const getProductById = async (req, res) => {
  const{product_name, product_id} = req.params
  try {
    res.send(await getProductByPk(product_id))
  }
  catch(error) {
    res.send(error)
  }
}

export const  getProducts = async (req, res) => {
    try {
      res.send(await getAllProducts());
    } catch (error) {
      res.send(error);
    }
}

export const getProductsAsAdmin = async (req, res) => {
    try {
      res.send(await getAllProductsAsAdmin());
    } catch (error) {
      res.send(error);
    }
}

export const getByDepId =  async (req, res) => {
    try {
      res.send(await getByDepartmentId(req.params.department_id));
    } catch (error) {
      res.send(error);
    }
}

export const getByCatId = async (req, res) => {
    try {
      res.send(await getByCategoryId(req.params.category_id));
    } catch (error) {
      res.send(error);
    }
}

export const getProductsByCategoryByPage = async (request, response) => {
    let { category_id, productsPerPage, startItem } = request.body.params
    try {
      res.send(await getProductsByCategoryByPagination(category_id, productsPerPage,startItem))
    }
    catch(error){
      res.send(error)
    }
}

export const getProductsByDepartmentByPage = async (request, response) => {
    let { department_id, productsPerPage, startItem } = request.body.params
    try {
      res.send(await getProductsByDepartmentByPagination(department_id, productsPerPage, startItem))
      }
    
    catch(error){
      res.send(error)
    }
}

export const getSearchProds = async (request, response) => {

    let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
    try {
      res.send(await getSearchProducts(inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem))
    }
  
    catch(error){
      res.send(error)
    }
}


export const addProd = async (req,res)=>{
  const {product_id, name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display}=req.body.product
    try {
    res.send(await addProduct(name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display))
    }
  
    catch(error){
      res.send(error)
    }
}

export const updateProd = async (req,res)=>{
    try {
    const {product_id, name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display}=req.body.product
    res.send(await updateProduct(product_id, name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display))
    }
  
    catch(error){
      res.send(error)
    }
}