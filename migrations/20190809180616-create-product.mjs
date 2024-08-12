'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    specification: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL
    },
    delivery_cost: {
      type: Sequelize.DECIMAL
    },
    image: {
      type: Sequelize.STRING
    },
    image_2: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    display: {
      type: Sequelize.INTEGER
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('product');
}