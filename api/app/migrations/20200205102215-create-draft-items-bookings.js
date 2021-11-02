'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('draftItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
      },
      sku: {
        type: Sequelize.STRING
      },
      event_booking_start: {
        type: Sequelize.DATEONLY
      },
      event_booking_end: {
        type: Sequelize.DATEONLY
      },
      draft_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "DraftBookings", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
      },
      order_quantity: {
        type: Sequelize.INTEGER
      },
      order_item_price: {
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
    return queryInterface.dropTable('draftItems');
  }
};