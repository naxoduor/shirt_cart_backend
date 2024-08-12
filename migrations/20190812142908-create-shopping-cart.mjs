'use strict';
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopping_cart', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.STRING
      },
      cart_id: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      attributes: {
        type: Sequelize.STRING,
        defaultValue: "Large Size",
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      buy_now: {
        type: Sequelize.BOOLEAN
      },
      added_on: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopping_cart');
  }
};
