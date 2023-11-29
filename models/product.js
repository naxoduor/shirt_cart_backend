import sequelize from "../config/database.js";
import Sequelize from "sequelize";

import ShoppingCart from "./shopping_cart.js";
("use strict");
const Product = sequelize.define(
  "product",
  {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    specification: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    discounted_price: Sequelize.DECIMAL,
    image: Sequelize.STRING,
    image_2: Sequelize.STRING,
    thumbnail: Sequelize.STRING,
    display: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Product;
// const Product = {

// };

// const product = sequelize.define('product', {
//   product_id:{
//     type:Sequelize.INTEGER,
//     primaryKey:true
//   },
//   name: Sequelize.STRING,
//   description: Sequelize.STRING,
//   price: Sequelize.DECIMAL,
//   discounted_price: Sequelize.DECIMAL,
//   image: Sequelize.STRING,
//   image_2: Sequelize.STRING,
//   thumbnail: Sequelize.STRING,
//   display: Sequelize.INTEGER
// },
// product.associate = function (models) {
//   // associations can be defined heresss

//   product.belongsToMany(models.category, {
//     foreignKey:"product_id",
//     through: {
//       model: models.product_category
//     }
//   }),
//   product.belongsToMany(models.attribute_value, {
//     foreignKey:"product_id",
//     through: {
//       model: models.product_attribute
//     }
//   })

// };

// export default product
