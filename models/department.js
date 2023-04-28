import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const Department = sequelize.define('department', {
    department_id: {
      type:Sequelize.INTEGER,
      primaryKey:true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  
export default Department
