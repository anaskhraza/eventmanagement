"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.addColumn("customers", "customer_address", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      return Promise.all(migrations);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");
  }
};
