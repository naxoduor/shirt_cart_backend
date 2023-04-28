import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const Tax = sequelize.define('tax', {
    tax_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tax_type: Sequelize.STRING,
    tax_percentage: Sequelize.FLOAT
  }, {});
  // tax.associate = function (models) {
  //   // associations can be defined here
  // };
  export default Tax;
