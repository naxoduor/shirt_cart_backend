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
    await ProductCart.create({product_id,cart_id,item_id,});

    await ShoppingCart.create({item_id,cart_id,product_id,quantity,added_on: new Date(),});

    return await ProductCart.findAll({
      include: [{ model: ShoppingCart }, { model: Product }],
      where: { cart_id },
    });
  }
  
  else {
    await entry.update({quantity,});

    return await ProductCart.findAll({
      include: [{model: ShoppingCart,},{model: Product,},],
      where: {cart_id,},
    });
  }
}

export async function findCartById(cart_id) {
  return await ProductCart.findAll({
    include: [{model: Product,},{model: ShoppingCart,},],
    where: {cart_id,},
  });
}

export async function updateCartById(item_id, cart_id, quantity) {
  const entry = await ShoppingCart.findByPk(item_id);
  await entry.update({quantity,});

  return await ProductCart.findAll({
    include: [{model: ShoppingCart,},{model: Product,},],
    where: {cart_id,},
  });
}

export async function removeProductFromCart(item_id, cart_id) {

  await ProductCart.destroy({
    where: {item_id,},
  });

  await ShoppingCart.destroy({
    where: {item_id,},
  });

  const cart = await ProductCart.findAll({
    include: [{model: ShoppingCart,},{model: Product,},],
    where: {cart_id,},
  });

  if (cart === null || cart.length < 1 || cart == undefined) {
    return [];
  } else {
    return cart;
  }
}
