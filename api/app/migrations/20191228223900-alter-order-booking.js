"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.addColumn("OrderBookings", "event_date", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "booking_date", {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "gross_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "discount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "total_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "vehicle_charges", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "service_expense", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "received_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "balance_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "complete", {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "event_start_date", {
          type: Sequelize.DATEONLY,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "no_of_person", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "per_head_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      migrations.push(
        queryInterface.addColumn("OrderBookings", "is_due_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      migrations.push(
        queryInterface.addColumn("OrderBookings", "booking_address", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      return Promise.all(migrations);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("OrderBookings");
  }
};
