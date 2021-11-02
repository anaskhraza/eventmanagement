"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.addColumn("DraftBookings", "event_date", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "booking_date", {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "gross_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "discount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "total_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "vehicle_charges", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "service_expense", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "received_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "balance_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "complete", {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "event_start_date", {
          type: Sequelize.DATEONLY,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "no_of_person", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("DraftBookings", "per_head_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      migrations.push(
        queryInterface.addColumn("DraftBookings", "is_due_amount", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      migrations.push(
        queryInterface.addColumn("DraftBookings", "booking_address", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      ); 
      return Promise.all(migrations);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("DraftBookings");
  }
};
