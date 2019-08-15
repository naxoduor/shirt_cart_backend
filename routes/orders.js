const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')

const ShoppingCart = require('../models').shopping_cart
const Product = require('../models').product
const Order = require('../models').order
const OrderDetail = require('../models').order_detail

router.post('/', (req, res) => {
  console.log(req.body.order)
  let inCartId = req.body.order.cartId
  let inCustomerId = req.body.order.customerId
  let inShippingId = req.body.order.shippingId
  let inTaxId = req.body.order.taxId
  console.log(inCartId)
  console.log(inCustomerId)
  console.log(inShippingId)
  console.log(inTaxId)

  let newOrder=Order.build({
    order_id: null,
    created_on: new Date(),
    customer_id: inCustomerId,
    shipping_id: inShippingId,
    tax_id: inTaxId
  })
  newOrder.save().then((orderItem) => {


    Order.findOne({
      where: {
          customer_id: inCustomerId,
      },
      order: [ [ 'created_on', 'DESC' ]],
  }).then((currentOrder) => {
    console.log("The order is as we print below")
    console.log(currentOrder)
    let order_id = JSON.parse(JSON.stringify(currentOrder)).order_id
    ShoppingCart.findAll({
      attributes: ['quantity', 'attributes', 'product_id'],
      include: [{// Notice `include` takes an ARRAY
        model: Product,
        as: "products",
        attributes: ['name', 'price']
      }],
      where: {
        cart_id: inCartId
      }
    }).then((cart) => {
      let total = 0;
      let itemsList = []
      cart.forEach((item, index) => {
        let good = JSON.parse(JSON.stringify(item))
        let attributes = good.attributes
        let obj = {}
        //console.log(item.getProducts())
        let quantity = good.quantity
        Product.findByPk(good.product_id).then((product) => {
          let productItem = JSON.parse(JSON.stringify(product))
          let unit_cost = productItem.price
          let subtotal = quantity * unit_cost
          total = total + subtotal
          obj.order_id = order_id
          obj.product_id = productItem.product_id
          obj.attributes = attributes
          obj.product_name = productItem.name
          obj.quantity = quantity
          obj.unit_cost = unit_cost
          itemsList.push(obj)
          if (!cart[index + 1]) {
            console.log(itemsList)
            //bulk create orders details
            OrderDetail.bulkCreate(itemsList)
              .then(() => {
                currentOrder.update({
                  total_amount: total
                }).then(() => {

                })
              })
          }
        })
      })
    })
  })
    //insert closing then ere
  })
});

module.exports = router;