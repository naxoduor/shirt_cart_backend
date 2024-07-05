import {Department} from '../models/index.js';
import {Product} from '../models/index.js'
import {Category} from '../models/index.js'
const Op = Sequelize.Op;

export async function findAllDepartments() {
    return await Department.findAll()
}

export async function countProductsById(department_id) {
    const products_on_department_count = await Product.count({
        include: [{model: Category,where: { department_id},}]
    })
    let obj = {products_on_department_count}
    list=[obj]
    return list
}

export async function findProductsById(department_id) {
    return await Product.findAll({
        include: [{model: Category,where: { department_id},}],
        offset: startItem,
        limit: productsPerPage
    })
}