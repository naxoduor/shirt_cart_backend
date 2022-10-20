const express = require('express')
const { route } = require('./orders')
const router = express.Router()
const order_detail = require('../models').order_detail
const Order = require('../models').order
const customer= require('../models').customer

router.get('/:id', async (req, res) => {
const orderid=req.params.id
console.log(orderid)
try {
const orderdetails = await Order.findOne({
    include: [
        {
        model:customer
      },
    {
        model:order_detail
    }],
    where:{
        order_id: orderid
    }
 })
console.log(orderdetails)
res.send(orderdetails)
}
catch(e){
    console.log(e)
}
})
module.exports = router

