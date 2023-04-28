import {
  Order,
  ProductCart,
  ShoppingCart,
  Product,
  OrderDetail,
} from "../models/index.js";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "",
    user: "",
    clientId: "",
    clientSecret: "",
    refreshToken: "",
  },
});

export async function findAllOrders() {
  const orders = await Order.findAll({
    include: {
      model: customer,
      attributes: ["name", "email"],
    },
  });
  return orders;
}

export async function findOrderDetailById(orderId) {
  const orderItems = await OrderDetail.findAll({
    include: {
      model: Order,
    },
    where: {
      order_id: orderId,
    },
  });
  return orderItems;
}

export async function createOrder(
  inCartId,
  inCustomerId,
  inShippingId,
  inTaxId
) {
  let newOrder = Order.build({
    order_id: null,
    created_on: new Date(),
    customer_id: inCustomerId,
    shipping_region_id: inShippingId,
    tax_id: inTaxId,
  });
  const orderItem = await newOrder.save();
  const currentOrder = await Order.findOne({
    where: {
      customer_id: inCustomerId,
    },
    order: [["created_on", "DESC"]],
  });
  let order_id = JSON.parse(JSON.stringify(currentOrder)).order_id;
  const cart = await ProductCart.findAll({
    include: [
      {
        // Notice `include` takes an ARRAY
        model: Product,
        // attributes: ["name", "price"],
      },
      {
        model: ShoppingCart,
        // attributes: ["quantity", "attributes", "product_id"],
      },
    ],
    where: {
      cart_id: inCartId,
    },
  });
  let total = 0;
  let totalDelivery = 0;
  let itemsList = [];
  cart.forEach(async (item, index) => {
    let good = JSON.parse(JSON.stringify(item));
    let obj = {};
    const product = good.product;
    const shopping_cart = good.shopping_cart;
    let productItem = JSON.parse(JSON.stringify(product));
    let cartItem = JSON.parse(JSON.stringify(shopping_cart));
    let quantity = cartItem.quantity;
    let unit_cost = productItem.price;
    let subtotal = quantity * unit_cost;
    let delivery_cost = productItem.delivery_cost;
    let subtotalDelivery = quantity * delivery_cost;
    total = total + subtotal;
    totalDelivery = totalDelivery + subtotalDelivery;
    obj.order_id = order_id;
    obj.product_id = productItem.product_id;
    obj.attributes = cartItem.attributes;
    obj.product_name = productItem.name;
    obj.quantity = quantity;
    obj.unit_cost = unit_cost;
    obj.delivery_cost = delivery_cost;
    itemsList.push(obj);
    if (!cart[index + 1]) {
      //bulk create orders details
      const returneddetails = await OrderDetail.bulkCreate(itemsList)
        const updatesOrder = await currentOrder
          .update({
            total_amount: total,
          })

            return returneddetails;
    }
  });
}
