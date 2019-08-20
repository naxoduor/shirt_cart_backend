const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const Product = require('../models').product
const Category = require('../models').category
const Sequelize = require('sequelize')

router.get('/', (req, res) => {

  let inDepartmentId = 1
  Product.findAll({
    include: [{// Notice `include` takes an ARRAY
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => res.send(products))
    .catch(console.error)

})

router.get('/inDepartment/:id', (req, res) => {
 
  let inDepartmentId = req.params.id
  let key = `/products/inDepartment/${inDepartmentId}`

  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => res.send(products))
    .catch(console.error)

})

router.get('/inCategory/:id', (req, res) => {
  let inCategorytId = req.params.id
  let key = `/products/inCategory/${inCategorytId}`

  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: inCategorytId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => res.send(products))
    .catch(console.error)
})

router.post('/inCategory/pagination/*', (request, response) => {

  let inCategorytId = parseInt(request.body.params.category_id)
  let inProductsPerPage = parseInt(request.body.params.productsPerPage)
  let inStartItem = parseInt(request.body.params.startItem)

  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: inCategorytId },
    }],
    offset: inStartItem,
    limit: inProductsPerPage
  })
    .then(products => {
      response.send(products)
    })
    .catch(console.error)

})

router.post('/inDepartment/pagination/*', (request, response) => {

  let inDepartmentId = parseInt(request.body.params.department_id)
  let inProductsPerPage = parseInt(request.body.params.productsPerPage)
  let inStartItem = parseInt(request.body.params.startItem)

  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    offset: inStartItem,
    limit: inProductsPerPage
  })
    .then(products => {
      response.send(products)
    })
    .catch(console.error)

})


router.post('/search*', (request, response) => {

  let inSearchString = request.body.params.inSearchString
  let inAllWords = request.body.params.inAllWords
  let inShortProductDescriptionLength = parseInt(request.body.params.inShortProductDescriptionLength)
  let inProductsPerPage = parseInt(request.body.params.inProductsPerPage)
  let inStartItem = parseInt(request.body.params.inStartItem)
  console.log(inSearchString)


  Product.findAll({
    where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
    replacements: {
      searchString: inSearchString
    }
  }).then(products => {
    response.send(products)
  })
})



module.exports = router