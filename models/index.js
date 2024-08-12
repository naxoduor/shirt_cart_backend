// 'use strict';
import AttributeValue from "./attribute_value.js";
import Attribute from "./attribute.js";
import Category from "./category.js";
import Customer from "./customer.js";
import Department from "./department.js";
import OrderDetail from "./order_detail.js";
import Order from "./order.js";
import ProductAttribute from "./product_attribute.js";
import ProductCategory from "./product_category.js";
import Product from "./product.js";
import ShippingRegion from "./shipping_region.js";
import Shipping from "./shipping.js";
import ShoppingCart from "./shopping_cart.js";
import Tax from "./tax.js";
import ProductCart from "./product_cart.js";
import Address from "./address.js";

AttributeValue.belongsToMany(Product, {
  foreignKey: "attribute_value_id",
  through: {
    model: ProductAttribute,
  },
});

AttributeValue.belongsTo(Attribute, {
  foreignKey: "attribute_id",
});

Attribute.hasMany(AttributeValue, { foreignKey: "attribute_id" });

Category.belongsToMany(Product, {
  foreignKey: "category_id",
  through: {
    model: ProductCategory,
  },
}),
  Category.belongsTo(Department, {
    foreignKey: "department_id",
  });

Customer.hasMany(ShippingRegion, {
  foreignKey: "shipping_region_id",
});

Customer.hasMany(Order, {
  foreignKey: "order_id",
});

Department.hasMany(Category, { foreignKey: "department_id" });

// associations can be defined here

OrderDetail.hasMany(Product, {
  foreignKey: "product_id",
}),
  OrderDetail.belongsTo(Order, {
    foreignKey: "order_id",
  });

  Address.belongsTo(Order, {
    foreignKey: "order_id"
  })

// associations can be defined here
Order.belongsTo(Customer, {
  foreignKey: "customer_id",
}),
  
  Order.belongsTo(Tax, {
    foreignKey: "tax_id",
  });
Order.hasMany(OrderDetail, {
  foreignKey: "order_id",
});

Shipping.belongsTo(ShippingRegion, {
  foreignKey: "shipping_region_id",
});

// Product.belongsTo(ShoppingCart, {
//   foreignKey: "product_id",
// });

ProductCart.belongsTo(Product, {
  foreignKey: "product_id",
});

ProductCart.belongsTo(ShoppingCart, {
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

export {
  Attribute,
  AttributeValue,
  Category,
  Customer,
  Department,
  OrderDetail,
  Order,
  ProductAttribute,
  ProductCategory,
  Product,
  ShippingRegion,
  Shipping,
  ShoppingCart,
  Tax,
  ProductCart,
};
