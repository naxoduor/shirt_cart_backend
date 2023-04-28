import {Department} from '../models/index.js';
import {Product} from '../models/index.js'
import {Category} from '../models/index.js'
const Op = Sequelize.Op;

export async function findAllDepartments() {
    const departments = await Department.findAll()
    return departments
}

export async function countProductsById(inDepartmentId) {
    const count = await Product.count({
        include: [{
            model: Category,
            where: { department_id: inDepartmentId },
        }]
    })
    let list = []
    let obj = {}
    obj.products_on_department_count = count
    list.push(obj)
    return list
}

export async function findProductsById(id) {
    const products = await Product.findAll({
        include: [{
            model: Category,
            where: { department_id: id },
        }],
        offset: startItem,
        limit: productsPerPage
    })
    res.send(products)
}