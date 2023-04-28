import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const ProductAttribute = sequelize.define('product_attribute', {
    product_id: {
      type:Sequelize.INTEGER,
      primaryKey:true
    },
    attribute_value_id: {
      type:Sequelize.INTEGER,
      primaryKey:true
    }
  }, {
      timestamps: false,
      freezeTableName: true
    });
  // product_attribute.associate = function (models) {
  //   //associations can be defined here
  // };
  export default ProductAttribute;
