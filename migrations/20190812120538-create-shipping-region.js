'use strict';
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shipping_region', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shipping_region_id: {
        type: Sequelize.INTEGER
      },
      shipping_region: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('shipping_region');
  }
};
