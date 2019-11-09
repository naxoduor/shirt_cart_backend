const express = require('express')
const router = express.Router()
const db = require('../config/database')
const cache = require('../config/cache')
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

  cache.get(key, (err, result) => {
    console.log("get from cache")
    if (result !== null) {
      return res.send(result)
    }
  })

  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => {
      console.log("set cache")
      cache.set(key, products, () => {
        res.send(products)
      })
    })
    .catch(console.error)
})

router.get('/inCategory/:id', (req, res) => {
  let inCategorytId = req.params.id
  let key = `/products/inCategory/${inCategorytId}`

  cache.get(key, (err, result) => {
    if (result !== null) {
      return res.send(result)
    }
  })


  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: inCategorytId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => {
      cache.set(key, products, () => {
        res.send(products)
      })
    })
    .catch(console.error)
})

router.post('/inCategory/pagination/:id', (request, response) => {

  let { category_id, productsPerPage, startItem } = request.body.params

  let key = `/products/inCategory/pagination${category_id}${startItem}`

  cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })

  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: category_id },
    }],
    offset: startItem,
    limit: productsPerPage
  })
    .then(products => {
      cache.set(key, products, () => {
        response.send(products)
      })
    })
    .catch(console.error)
})

router.post('/inDepartment/pagination/:id', (request, response) => {

  let { department_id, productsPerPage, startItem } = request.body.params
  
  let key = `/products/inDepartment/pagination${department_id}${startItem}`
  cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })
  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: department_id },
    }],
    offset: startItem,
    limit: productsPerPage
  })
    .then(products => {
      cache.set(key, products, () => {
        response.send(products)
      })
    })
    .catch(console.error)
})

router.post('/search*', (request, response) => {

  let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
  console.log(inSearchString)
  let key = `/products/search/${searchString}$`

  cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })

  Product.findAll({
    where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
    replacements: {
      searchString: inSearchString
    }
  }).then(products => {
    cache.set(key, products, () => {
      response.send(products)
    })
  })
  .catch(console.error)
})

module.exports = router