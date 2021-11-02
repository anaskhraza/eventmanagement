"use strict";
module.exports = (sequelize, DataTypes) => {
  const targets = sequelize.define(
    "targets",
    {
      month_year: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  targets.associate = function(models) {
    // associations can be defined here
  };
  return targets;
};
