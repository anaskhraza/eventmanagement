"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.addColumn("OrderBookings", "order_title", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("OrderBookings", "location_address", {
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
