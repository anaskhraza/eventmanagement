'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    category_name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};