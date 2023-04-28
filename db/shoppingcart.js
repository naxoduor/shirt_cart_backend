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

export async function addItemToCart(cartId, productId, quantity) {
  let cartList = [];
  const itId = uuidv1();

  const entry = await ProductCart.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });

  if (!entry) {
    const cart_product = await ProductCart.create({
      product_id: productId,
      cart_id: cartId,
      item_id: itId,
    });

    const cart = await ShoppingCart.create({
      item_id: itId,
      cart_id: cartId,
      product_id: productId,
      quantity: quantity,
      added_on: new Date(),
    });
    const shopping_cart = await ProductCart.findAll({
      include: [
        {
          model: ShoppingCart,
        },
        {
          model: Product,
        },
      ],
      where: {
        cart_id: cartId,
      },
    });
    return shopping_cart;
  } else {
    const cart = await entry.update({
      quantity: quantity,
    });
    const shopping_cart = await ProductCart.findAll({
      include: [
        {
          model: ShoppingCart,
        },
        {
          model: Product
        }
      ],
      where: {
        cart_id: cartId,
      },
    });
    return shopping_cart;
  }
}

export async function findCartById(inCartId) {
  const cart = await ProductCart.findAll({
    include: [
      {
        model: Product,
      },
      {
        model: ShoppingCart,
        where: {
          cart_id: inCartId,
        },
      },
     ],
  });
  return cart;
}

export async function updateCartById(inItemId, cartId, cartList, quantity) {
  const entry = await ShoppingCart.findByPk(inItemId);
  const shopping_cart = awaitentry.update({
    quantity: quantity,
  });

  const cart = await Product.findAll({
    include: [
      {
        model: ProductCart,
        include: [
          {
            ShoppingCart,
            where: {
              cart_id: cartId,
            },
          },
        ],
      },
    ],
  });
  return cart;
}

export async function removeProductFromCart(inItemId, cartId) {
  let cartList = [];
  const shopping_cart = await ShoppingCart.destroy({
    where: {
      item_id: inItemId,
    },
  });

  const cart = await Product.findAll({
    include: [
      {
        model: ShoppingCart,
        where: {
          cart_id: cartId,
        },
      },
    ],
  });

  if (cart === null || cart.length < 1 || cart == undefined) {
    return cartList;
  } else {
    return cart;
  }
}
