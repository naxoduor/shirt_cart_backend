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

router.get('/totalitems/:id', async (req, res) => {
    let inDepartmentId = req.params.id
    try {
        const productsCount = await countProductsById(inDepartmentId)
        res.send(productsCount)

    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.post('/products/:id', async (req, res) => {
    
    let { id, productsPerPage, startItem } = request.body.params
    try {
        const products = await findProductsById(id)
        res.send(products)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})


export default router