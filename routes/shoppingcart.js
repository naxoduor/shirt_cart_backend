const express = require('express');
const router = express.Router()
//const cache = require('../config/cache')
const ShoppingCart = require('../models').shopping_cart
const Product = require('../models').product
const uuidv1 = require('uuid/v1');

router.get('/', (req, res)=>{
  res.send("success")
})


router.get('/generateUniqueId', (req, res) => {
  let cart_id = ""
  let possible = "ABCDEFGHIJKLMNopqrstuvwxyz123456"
  for (let i = 0; i < possible.length; i++)
    cart_id += possible.charAt(Math.floor(Math.random() * possible.length))
  res.send(cart_id)
})

router.get('/add', (req, res)=>{
  res.send("success")
})


router.post('/add', (req, res) => {
  let {cartId, productId,quantity } = req.body.params
  let cartList = []
  ShoppingCart.findOne({
    where: {
      cart_id: cartId,
      product_id: productId
    }
  }).then((entry) => {
    if (!entry) {
        ShoppingCart.create({
          item_id: uuidv1(),
          cart_id: cartId,
          product_id: productId,
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
            }).catch(err=>{
            console.log(err)
            })
              
        }).catch(error=>{
          console.log(error)
        })

    }
    else {
      entry.update({
        quantity: quantity
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
          }).catch(err=>console.log(err))
        
      }).catch(console.error)
    }
  }).catch(console.error)
    .catch(err => console.log(err));
});


// router.get('/:cart_id', (req, res) => {
//   console.log("get cart items")
//   let inCartId = req.params.cart_id
//   let cartList = []
//   ShoppingCart.findAll({
//     where: {
//       cart_id: inCartId
//     },
//     include: [{
//       model: Product,
//       attributes: ['name', 'price', 'description', 'image', 'delivery_cost']
//     }]
//   })
//     .then((cart) => {
//       cart.forEach((item,index) => {
//         let cartItem = JSON.parse(JSON.stringify(item))
//         Product.findByPk(cartItem.product_id).then((product) => {
//           let obj = {}
//           obj.item_id = cartItem.item_id
//           obj.quantity = cartItem.quantity
//           obj.name = product.name
//           obj.price = product.price
//           obj.description = product.description
//           obj.image = product.image
//           obj.delivery_cost=product.delivery_cost
//           cartList.push(obj)
//           if (!cart[index + 1]) {
//             res.send(cartList)
//           }
//         })
//       })
//     })
//     .catch(error=>{
//       console.log(error)
//       res.send(error);
//     })
// })

router.get('/:cart_id', (req, res) => {
  let inCartId = req.params.cart_id
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
          obj.quantity = cartItem.quantity
          obj.name = product.name
          obj.price = product.price
          obj.description = product.description
          obj.image = product.image
          cartList.push(obj)
          if (!cart[index + 1]) {
            console.log("send cart list")
            res.send(cartList)
          }
        })
      })
    })
    .catch(error=>{
      res.send(error);
    })
})




router.put('/update/:joined_ids', (req, res) => {
  
  let joined_ids = req.params.joined_ids
  let arrc=joined_ids.split('&')
  let inItemId = arrc[0]
  let cartId = arrc[arrc.length-1]
  let cartList = []
  let { quantity } = req.body.params

  ShoppingCart.findByPk(inItemId).then((entry) => {
      entry.update({
        quantity: quantity
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
          }).catch(err=>console.log(err))
      }).catch(err=>{
        console.log(err)
      })  
  }).catch(console.error)
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
        if(cart === null || cart.length < 1 || cart == undefined){
          res.status(404).json(cartList)
        }
        else{
        cart.forEach((item,index) => {
          let cartItem = JSON.parse(JSON.stringify(item))
          Product.findByPk(cartItem.product_id).then((product) => {
            let obj = {}
            obj.item_id = cartItem.item_id
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
      }
      }).catch(err=>{
        res.send(err)
      })
  }).catch(error=>{
    res.send(error)
  })
});

/*router.get('/totalAmount/:cart_id', (req, res) => {
  let inCartId = req.params.cart_id
  ShoppingCart.findAll({
      attributes: ['cart_id', [ShoppingCart.sequelize.fn('sum', ShoppingCart.sequelize.col('amount')), 'total']],
      //attributes: [[db.sequelize.literal('SUM(col_a * col_b)'), 'result']],
      group : ['cart_id'],
      raw: true,
    where: {
      cart_id: "zoyooyACNJ6M1pJuKsysoApzsq6xF2Gy"
    },
  }).then((cart) => {
    
    if(cart === null || cart.length < 1 || cart == undefined){
      let cartlist=[]
      r
    }
    else{
      res.send(cart)
      }
  })
});
*/
module.exports = router