const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const Product = require('../models').product
const Department = require('../models').department
const Category = require('../models').category

router.get('/', (req, res) => {

    Department.findAll().then((departments) =>{
        res.send(departments)
    })
        
})

router.get('/totalitems/:id', (req, res) => {
    let inDepartmentId = req.params.id

    Product.count({
        include: [{
            model: Category,
            where: { department_id: inDepartmentId },
        }]
    }).then((count) => {
        let list = []
        let obj = {}
        obj.products_on_department_count = count
        list.push(obj)
        res.send(list)
        //console.log(JSON.stringify(list))
        
    })

})

router.post('/products/:id', (req, res) => {
    let inDepartmentId = req.params.id
    let inProductsPerPage = parseInt(request.body.params.productsPerPage)
    let inStartItem = parseInt(request.body.params.startItem)

    Product.findAll({
        include: [{
            model: Category,
            where: { department_id: inDepartmentId },
        }],
        offset: inStartItem,
        limit: inProductsPerPage
    }).then((products) => {
        res.send(products)
    })

})


module.exports = router