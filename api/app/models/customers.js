"use strict";
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    "customers",
    {
      customer_name: DataTypes.STRING,
      email: DataTypes.STRING,
      customer_address: DataTypes.STRING,
      customer_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      alternate_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
      }
    },
    {}
  );
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};
