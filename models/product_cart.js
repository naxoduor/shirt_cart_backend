import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const ProductCart = sequelize.define('product_cart', {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    cart_id: Sequelize.STRING,
    item_id: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  // product_category.associate = function (models) {
  //   // associations can be defined here
  // };
  export default ProductCart;

