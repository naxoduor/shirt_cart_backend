import express from 'express'
const router = express.Router()
//const cache = require('../config/cache')
import { findAllDepartments, countProductsById, findProductsById } from '../db/departments'

router.get('/', async (req, res) => {
    try {
        const departments = await findAllDepartments()
        res.send(departments)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.get('/totalitems/:department_id', async (req, res) => {
    const {department_id} = req.params
    try {
        const productsCount = await countProductsById(department_id)
        res.send(productsCount)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.post('/products/:department_id', async (req, res) => {
    
    let { department_id, productsPerPage, startItem } = request.body.params
    try {
        const products = await findProductsById(department_id)
        res.send(products)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})


export default router