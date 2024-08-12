import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const Order = sequelize.define('order', {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    total_amount: Sequelize.DECIMAL,
    created_on: Sequelize.DATE,
    shipped_on: Sequelize.DATE,
    status: Sequelize.INTEGER,
    comments: Sequelize.STRING,
    customer_id: Sequelize.INTEGER,
    auth_code: Sequelize.STRING,
    reference: Sequelize.STRING,
    // shipping_region_id: Sequelize.INTEGER,
    tax_id: Sequelize.INTEGER
  }, {
    timestamps: false,
  });
  
  export default Order
