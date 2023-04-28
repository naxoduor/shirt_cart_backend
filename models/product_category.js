import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const ProductCategory = sequelize.define('product_category', {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    category_id: Sequelize.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  // product_category.associate = function (models) {
  //   // associations can be defined here
  // };
  export default ProductCategory;

