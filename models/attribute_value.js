import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const AttributeValue = sequelize.define('attribute_value', {
    attribute_value_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    attribute_id: Sequelize.INTEGER,
    value: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  
  export default AttributeValue;

