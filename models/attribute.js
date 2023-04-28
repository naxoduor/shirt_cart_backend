import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const Attribute = sequelize.define('attribute', {
    attribute_id: {
      type:Sequelize.INTEGER,
      primaryKey:true
    },
    name: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true
    });
  // attribute.associate = function (models) {
  //   attribute.hasMany(models.attribute_value, { foreignKey: 'attribute_id' })
  // };
  export default Attribute;

