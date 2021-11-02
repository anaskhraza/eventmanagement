'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      rate: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
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
    return queryInterface.dropTable('items');
  }
};