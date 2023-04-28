import { Category} from "../models/index.js";
import {Product} from "../models/index.js";

export async function findAllCategories() {
  const categories = await Category.findAll({});
  return categories;
}

export async function findAllCategoriesByDepartmentId(inDepartmentId) {
  const categories = await Category.findAll({
    where: {
      department_id: inDepartmentId,
    },
  });
  return categories;
}

export async function findTotalProductsByCategoryId(inCategoryId) {
  const count = await Product.count({
    include: [
      {
        model: Category,
        where: { category_id: inCategoryId },
      },
    ],
  });
  let list = [];
  let obj = {};
  obj.categories_count = count;
  list.push(obj);
  return list;
}

export async function findProductsByCategoryId(category_id, productsPerPage, startItem){
    const products = await Product.findAll({
        include: [
          {
            model: Category,
            where: { category_id: category_id },
          },
        ],
        offset: startItem,
        limit: productsPerPage,
      });
    return products
}
