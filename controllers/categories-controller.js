import {findAllCats,findAllCategoriesByDepartmentId,findTotalProductsByCategoryId,findProductsByCategoryId} from "../db/categories.js";


export const findAllCats = async (req, res) => {
    try {
      const categories = await findAllCategories();
      res.send(categories);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}

export const findAllCategoriesByDepId = async (req, res) => {
    const {department_id} = req.params;
    try {
      const categories = await findAllCategoriesByDepartmentId(department_id);
      res.send(categories);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}

export const findTotalProductsByCatId = async (req, res) => {
    const {category_id} = req.params;
    try {
      const list= findTotalProductsByCategoryId(category_id)
      res.send(list);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}

export const findProdsByCatId = async (req, res) => {
    const { category_id, productsPerPage, startItem } = request.body.params;
    try {
      const products = await findProductsByCategoryId(category_id, productsPerPage, startItem)
      res.send(products);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}



