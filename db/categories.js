import { Category} from "../models/index.js";
import {Product} from "../models/index.js";

export async function findAllCategories() {
  return await Category.findAll({});
}

export async function findAllCategoriesByDepartmentId(department_id) {
  return await Category.findAll({
    where: {department_id},});
}

export async function findTotalProductsByCategoryId(category_id) {
  const categories_count = await Product.count({
    include: [{model: Category,where: { category_id },},],
  });
  let obj = {categories_count};
  let list=[obj]
  return list;
}

export async function findProductsByCategoryId(category_id, limit, offset){
    return await Product.findAll({
        include: [{model: Category,where: { category_id},},],
        offset,limit,});
}
