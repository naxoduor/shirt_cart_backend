const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
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

router.get('/:cart_id', (req, res) => {
  console.log("get cart items")
  let inCartId = req.params.cart_id
  console.log(inCartId)
  let cartList = []
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
            console.log(cartList)
            res.send(cartList)
          }
        })
      })
    })
    .catch(console.error)
})

router.post('/add', (req, res) => {
  
  let {cartId, productId, attributes, quantity } = req.body.params
  let cartList = []
  ShoppingCart.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
      attributes: attributes
    }
  }).then((entry) => {
    if (!entry) {
        ShoppingCart.create({
          item_id: uuidv1(),
          cart_id: cartId,
          product_id: productId,
          attributes: attributes,
          quantity: quantity,
          added_on: new Date()
        }).then((cart) => {
          ShoppingCart.findAll({
            where: {
              cart_id: cartId
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
                    console.log(cartList)
                    res.send(cartList)
                  }
                })
              })
            }).catch(err=>console.log(err))
        }).catch(console.error)

    }
    else {
      entry.update({
        quantity: quantity
      }).then((cart) => {
        res.send(cart)
      }).catch(console.error)
    }
  }).catch(console.error)
    .catch(err => console.log(err));
});

router.put('/update/:item_id', (req, res) => {
  
  let inItemId = req.params.item_id
  let quantity = req.body.params.quantity
  ShoppingCart.findByPk(inItemId).then((entry) => {
  
      entry.update({
        quantity: quantity
      }).then((cart) => {
      res.send(cart)  
      }).catch(console.error)    
  }).catch(console.error)
    .catch(err => console.log(err));
});

router.delete('/removeProduct/:joined_ids', (req, res) => {
  let joined_ids = req.params.joined_ids
  let arrc=joined_ids.split('&')
  let inItemId = arrc[0]
  let cartId = arrc[arrc.length-1]

  let cartList = []
  ShoppingCart.destroy({
    where: {
      item_id: inItemId
    }
  }).then(()=>{

    ShoppingCart.findAll({
      where: {
        cart_id: cartId
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
              console.log(cartList)
              res.send(cartList)
            }
          })
        })
      }).catch(err=>console.log(err))
  }).catch(console.error)

});

router.get('/totalAmount/:cart_id', (req, res) => {
  let inCartId = req.params.cart_id
  ShoppingCart.findOne({
    where: {
      cart_id: inCartId
    }
  }).then((cart) => {
    console.log(cart.getProducts())
  })
});

module.exports = router