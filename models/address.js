'use strict';
import sequelize from "../config/database.js";
import Sequelize from "sequelize";

const Address = sequelize.define('address', {
    name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    postal_address: Sequelize.STRING,
    email: Sequelize.STRING,
    order_id: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });

export default Address;
