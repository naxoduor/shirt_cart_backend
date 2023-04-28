import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const Shipping = sequelize.define('shipping', {
    shipping_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    shipping_type: Sequelize.STRING,
    shipping_cost: Sequelize.STRING,
    shipping_region_id: Sequelize.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  
  export default Shipping;

