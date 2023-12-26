import {Order,ProductCart,ShoppingCart,Product,OrderDetail,} from "../models/index.js";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({host: "smtp.gmail.com",port: 465,secure: true,auth: {type: "",user: "",clientId: "",clientSecret: "",refreshToken: "",},
});

export async function findAllOrders() {
  const orders = await Order.findAll({
    include: {model: customer,attributes: ["name", "email"],},
  });
  return orders;
}

export async function findOrderDetailById(order_id) {
  const orderItems = await OrderDetail.findAll({
    include: {model: Order,},
    where: {order_id,},
  });
  return orderItems;
}

export async function createOrder(cart_id,customer_id,shipping_region_id,tax_id) {

  let newOrder = Order.build({order_id: null, created_on: new Date(), customer_id, shipping_region_id,tax_id});

  const orderItem = await newOrder.save();

  const currentOrder = await Order.findOne({where: {customer_id},order: [["created_on", "DESC"]],});

  let order_id = JSON.parse(JSON.stringify(currentOrder)).order_id;

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

  if (!cart[index + 1]) {
    const returneddetails = await OrderDetail.bulkCreate(itemsList)
    const updatesOrder = await currentOrder.update({total_amount})
  }

  const result = ProductCart.destroy({where: {cart_id}})
  return []
}
