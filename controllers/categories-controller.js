import {findAllCategories,findAllCategoriesByDepartmentId,findTotalProductsByCategoryId,findProductsByCategoryId} from "../db/categories.js";


export const findAllCats = async (req, res) => {
    try {
      res.send(await findAllCategories());
    } catch (error) {
      res.send(error);
    }
}

export const findAllCategoriesByDepId = async (req, res) => {
    try {
      res.send(await findAllCategoriesByDepartmentId(req.params.department_id));
    } catch (error) {
      res.send(error);
    }
}

export const findTotalProductsByCatId = async (req, res) => {
    try {
      res.send(findTotalProductsByCategoryId(req.params.category_id))
    } catch (error) {
      res.send(error);
    }
}

export const findProdsByCatId = async (req, res) => {
    const { category_id, productsPerPage, startItem } = request.body.params;
    try {
      res.send(await findProductsByCategoryId(category_id, productsPerPage, startItem))
    } catch (error) {
      res.send(error);
    }
}



