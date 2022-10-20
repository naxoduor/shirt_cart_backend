const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const Product = require('../models').product
const Category = require('../models').category

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.send(categories)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.get('/inDepartment/:id', async (req, res) => {
    let inDepartmentId = req.params.id
    try {
        const categories = await Category.findAll({
            where: {
                department_id: inDepartmentId
            }
        })
        res.send(categories)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.get('/totalitems/:id', async (req, res) => {
    let inCategoryId = req.params.id
    try {
        const count= await Product.count({
            include: [{
                model: Category,
                where: { category_id: inCategoryId },
            }]
    })
    let list = []
        let obj = {}
        obj.categories_count = count
        list.push(obj)
        res.send(list)      
}
    catch(error){
        console.log(error)
        res.send(error)
    }    
    })


router.post('/products/*', async (req, res) => {
    let { category_id, productsPerPage, startItem } = request.body.params
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                where: { category_id: category_id },
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