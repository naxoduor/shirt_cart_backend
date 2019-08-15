const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const Product = require('../models').product
const Category = require('../models').category

router.get('/', (req, res) => {

    Category.findAll().then((categories) => {
        res.send(categories)
    })
})

router.get('/inDepartment/*', (req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query)
    let inDepartmentId = parsedQs.id
    console.log(inDepartmentId)

    Category.findAll({
        where: {
            department_id: inDepartmentId
        }
    }).then((categories) => {
        res.send(categories)
    });
})

router.get('/totalitems/*', (req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query)
    let inCategoryId = parsedQs.id


    Product.count({
        include: [{
            model: Category,
            where: { category_id: inCategoryId },
        }]
    }).then((count) => {
        let list = []
        let obj = {}
        obj.categories_count = count
        list.push(obj)
        res.send(list)
        //console.log(JSON.stringify(list))
        
    })

    router.post('/products/*', (req, res) => {
    let inCategoryId = parseInt(request.body.params.category_id)
    let inProductsPerPage = parseInt(request.body.params.productsPerPage)
    let inStartItem = parseInt(request.body.params.startItem)

        Product.findAll({
            include: [{
                model: Category,
                where: { category_id: inCategoryId },
            }],
            offset: inStartItem,
            limit: inProductsPerPage
        }).then((products) => {
            res.send(products)         
        })
    })
})
module.exports = router