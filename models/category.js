import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';

  const Category = sequelize.define('category', {
    category_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    department_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
  });
  

export default Category