import { findAllDepartments, countProductsById, findProductsById } from '../db/departments'

export const findDepartments= async (req, res) => {
    try {
        const departments = await findAllDepartments()
        res.send(departments)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}

export const totalItems = async (req, res) => {
    const {department_id} = req.params
    try {
        const productsCount = await countProductsById(department_id)
        res.send(productsCount)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}

export const products = async (req, res) => {
    
    let { department_id, productsPerPage, startItem } = request.body.params
    try {
        const products = await findProductsById(department_id)
        res.send(products)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}


