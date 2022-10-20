'use strict';
const Role={
  MEMBER:'MEMBER',
  ADMIN:'ADMIN'
}
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    credit_card: DataTypes.TEXT,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    shipping_region_id: DataTypes.INTEGER,
    day_phone: DataTypes.STRING,
    eve_phone: DataTypes.STRING,
    mob_phone: DataTypes.STRING,
    role: {
      type:DataTypes.STRING,
      defaultValue:Role.MEMBER
    }
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  customer.associate = function (models) {
    // associations can be defined here
    customer.hasMany(models.shipping_region, {
      foreignKey:"shipping_region_id",
    })
  };
  customer.associate = function (models) {
    // associations can be defined here
    customer.hasMany(models.order, {
      foreignKey:"order_id",
    })
  };
  return customer;
};
