import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
const Role={
  MEMBER:'MEMBER',
  ADMIN:'ADMIN'
}
  const Customer = sequelize.define('customer', {
    customer_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    credit_card: Sequelize.TEXT,
    address_1: Sequelize.STRING,
    address_2: Sequelize.STRING,
    city: Sequelize.STRING,
    region: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    country: Sequelize.STRING,
    shipping_region_id: Sequelize.INTEGER,
    day_phone: Sequelize.STRING,
    eve_phone: Sequelize.STRING,
    mob_phone: Sequelize.STRING,
    role: {
      type:Sequelize.STRING,
      defaultValue:Role.MEMBER
    }
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  

  export default Customer
