import { findAllDepartments, countProductsById, findProductsById } from '../db/departments'

export const findDepartments= async (req, res) => {
    try {
        res.send(await findAllDepartments())
    }
    catch(error){
        res.send(error)
    }
}

export const totalItems = async (req, res) => {
    try {
        res.send(await countProductsById(req.params.department_id))
    }
    catch(error){
        res.send(error)
    }
}

export const products = async (req, res) => {
    
    try {
        res.send(await findProductsById(req.body.params.department_id))
    }
    catch(error){
        res.send(error)
    }
}


