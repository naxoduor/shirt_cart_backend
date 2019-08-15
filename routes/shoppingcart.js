const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const ShoppingCart = require('../models').shopping_cart
const Product = require('../models').product
const uuidv1 = require('uuid/v1');

router.get('/generateUniqueId', (req, res) => {
  let cart_id = ""
  let possible = "ABCDEFGHIJKLMNopqrstuvwxyz123456"
  for (let i = 0; i < possible.length; i++)
    cart_id += possible.charAt(Math.floor(Math.random() * possible.length))
  res.send(cart_id)
})


router.get('/', (req, res) => {

  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inCartId = parsedQs.cart_id

  let cartList = []
  console.log("inside finding shopping cart")
  ShoppingCart.findAll({
    where: {
      cart_id: inCartId
    },
    include: [{
      model: Product,
      attributes: ['name', 'price', 'description', 'image']
    }]
  })
    .then((cart) => {
      cart.forEach((item,index) => {
        let cartItem = JSON.parse(JSON.stringify(item))
        Product.findByPk(cartItem.product_id).then((product) => {
          let obj = {}
          obj.item_id = cartItem.item_id
          obj.attributes = cartItem.attributes
          obj.quantity = cartItem.quantity
          obj.name = product.name
          obj.price = product.price
          obj.description = product.description
          obj.image = product.image
          cartList.push(obj)
          if (!cart[index + 1]) {
            res.send(cartList)
          }
        })
      })
    })
    .catch(console.error)
})

router.post('/add', (req, res) => {
  console.log(req.body.params)
  let inCartId = req.body.params.cartId
  let inProductId = parseInt(req.body.params.productId)
  let inAttributes = req.body.params.attributes
  let inProductName = req.body.params.name
  let inUnitCost = req.body.params.price

  ShoppingCart.findOne({
    where: {
      cart_id: inCartId,
      product_id: inProductId,
      attributes: inAttributes
    }
  }).then((entry) => {
    if (!entry) {
        ShoppingCart.create({
          item_id: uuidv1(),
          cart_id: inCartId,
          product_id: inProductId,
          attributes: inAttributes,
          quantity: 1,
          added_on: new Date()
        }).then((cart) => {
          console.log(cart)
        }).catch(console.error)

    }
    else {
      entry.update({
        quantity: entry.quantity + 1
      }).then((cart) => {
      }).catch(console.error)

    }
  }).catch(console.error)
    .catch(err => console.log(err));
});

router.delete('/removeProduct/*', (req, res) => {

  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inItemId = parsedQs.item_id
  console.log(inItemId)
  ShoppingCart.destroy({
    where: {
      item_id: inItemId
    }
  })
});

router.get('/totalAmount/*', (req, res) => {

  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inCartId = parsedQs.cart_id
  console.log("get cart total amount")
  console.log(inCartId)
  ShoppingCart.findOne({
    where: {
      cart_id: inCartId
    }
  }).then((cart) => {
    console.log(cart.getProducts())
  })
});


module.exports = router