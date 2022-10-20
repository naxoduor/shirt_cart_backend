const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const Product = require('../models').product
const Department = require('../models').department
const Category = require('../models').category

router.get('/', async (req, res) => {

    try {
        const departments = await Department.findAll()
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
        res.send(list)

    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.post('/products/:id', async (req, res) => {
    
    let { id, productsPerPage, startItem } = request.body.params
    try {
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
    catch(error){
        console.log(error)
        res.send(error)
    }
})


module.exports = router