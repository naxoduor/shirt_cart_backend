'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    product_id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discounted_price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    image_2: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    display: DataTypes.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  product.associate = function (models) {
    // associations can be defined here
    product.belongsToMany(models.category, {
      foreignKey:"product_id",
      through: {
        model: models.product_category
      }
    })
  };
  return product;
};