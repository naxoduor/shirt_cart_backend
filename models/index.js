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

// associations can be defined here
Order.belongsTo(Customer, {
  foreignKey: "customer_id",
}),
  Order.belongsTo(ShippingRegion, {
    foreignKey: "shipping_region_id",
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
  foreignKey: 'product_id'
});

ProductCart.belongsTo(ShoppingCart, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE'
})

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
  ShippingRegion,Shipping,ShoppingCart, Tax, ProductCart
};

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
