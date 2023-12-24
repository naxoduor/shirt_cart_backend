import { ShoppingCart } from "../models/index.js";
import { Product, ProductCart } from "../models/index.js";
import uuidv1 from "uuid/v1.js";

export async function generateUniqueId() {
  let cart_id = "";
  let possible = "ABCDEFGHIJKLMNopqrstuvwxyz123456";
  for (let i = 0; i < possible.length; i++)
    cart_id += possible.charAt(Math.floor(Math.random() * possible.length));
  return cart_id;
}

export async function addItemToCart(cart_id, product_id, quantity) {
  const item_id = uuidv1();

  const entry = await ProductCart.findOne({
    where: { cart_id, product_id },
  });

  if (!entry) {
    const cart_product = await ProductCart.create({product_id,cart_id,item_id,});

    const cart = await ShoppingCart.create({item_id,cart_id,product_id,quantity,added_on: new Date(),});

    const shopping_cart = await ProductCart.findAll({
      include: [{ model: ShoppingCart }, { model: Product }],
      where: { cart_id },
    });
    return shopping_cart;
  }
  
  else {
    const cart = await entry.update({quantity,});

    const shopping_cart = await ProductCart.findAll({
      include: [{model: ShoppingCart,},{model: Product,},],
      where: {cart_id,},
    });
    return shopping_cart;
  }
}

export async function findCartById(cart_id) {
  const cart = await ProductCart.findAll({
    include: [{model: Product,},{model: ShoppingCart,},],
    where: {cart_id,},
  });
  return cart;
}

export async function updateCartById(item_id, cart_id, quantity) {
  const entry = await ShoppingCart.findByPk(item_id);
  const shopping_cart = await entry.update({quantity,});

  const cart = await ProductCart.findAll({
    include: [{model: ShoppingCart,},{model: Product,},],
    where: {cart_id,},
  });
  return cart;
}

export async function removeProductFromCart(item_id, cart_id) {
  let cartList = [];
  const product_cart = await ProductCart.destroy({
    where: {item_id,},
  });

  const scart = await ShoppingCart.destroy({
    where: {item_id,},
  });

  const cart = await ProductCart.findAll({
    include: [{model: ShoppingCart,},{model: Product,},],
    where: {cart_id,},
  });

  if (cart === null || cart.length < 1 || cart == undefined) {
    return cartList;
  } else {
    return cart;
  }
}
