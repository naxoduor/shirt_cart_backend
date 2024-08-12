import {Order,ProductCart,ShoppingCart,Product,OrderDetail,} from "../models/index.js";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({host: "smtp.gmail.com",port: 465,secure: true,auth: {type: "",user: "",clientId: "",clientSecret: "",refreshToken: "",},
});

export async function findAllOrders() {
  return await Order.findAll({
    include: {model: customer,attributes: ["name", "email"],},
  });
}

export async function findOrderDetailById(order_id) {
  return await OrderDetail.findAll({
    include: {model: Order,},
    where: {order_id,},
  });
}

export async function createOrder(cart_id, transactionNumber) {

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  

  let txnNumber = getRandomInt(0, 10000)


  let newOrder = Order.build({order_id: null, created_on: new Date(), customer_id:txnNumber,tax_id:null});

  const orderItem = await newOrder.save();

  
  const currentOrder = await Order.findOne({where: {customer_id:txnNumber},order: [["created_on", "DESC"]],});

  console.log("log the new order")
  console.log(currentOrder)


  let order_id = JSON.parse(JSON.stringify(currentOrder)).order_id;

  console.log("log order id")
  console.log(order_id)

  const cart = await ProductCart.findAll({include: [{model: Product,},{model: ShoppingCart,},],where: {cart_id,},});

  let total_amount = 0, totalDelivery = 0;

  const itemsList = cart.map((item) => {
    let good = JSON.parse(JSON.stringify(item));
    const {product, shopping_cart} = good
    let productItem = JSON.parse(JSON.stringify(product)), cartItem = JSON.parse(JSON.stringify(shopping_cart));
    const {delivery_cost, product_id, name, price} = productItem
    const {quantity, attributes} = cartItem
    let product_name = name, unit_cost=price, subtotal = quantity * price, subtotalDelivery = quantity * delivery_cost;
    total_amount = total_amount + subtotal, totalDelivery = totalDelivery + subtotalDelivery;
    return {order_id, product_id, attributes, product_name, quantity, unit_cost, delivery_cost }
  });

  const returneddetails = await OrderDetail.bulkCreate(itemsList)
  const updatesOrder = await currentOrder.update({total_amount})

  // if (!cart[index + 1]) {
  //   const returneddetails = await OrderDetail.bulkCreate(itemsList)
  //   const updatesOrder = await currentOrder.update({total_amount})
  // }

  // const result = ProductCart.destroy({where: {cart_id}})
  return currentOrder
}
