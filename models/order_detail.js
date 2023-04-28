import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const OrderDetail = sequelize.define('order_detail', {
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    order_id: Sequelize.INTEGER,
    product_id: Sequelize.INTEGER,
    attributes: Sequelize.STRING,
    product_name: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    unit_cost: Sequelize.DECIMAL,
    // delivery_cost: DataTypes.DECIMAL
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  
  export default OrderDetail;

