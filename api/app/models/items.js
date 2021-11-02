"use strict";
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      name: DataTypes.STRING,
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      rate: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      is_void: DataTypes.BOOLEAN
    },
    {}
  );
  items.associate = function(models) {
    // associations can be defined here
    models.categories.hasMany(items, {
      foreignKey: "category_id",
      sourceKey: "id",
      as: "Item Category"
    });
    items.belongsTo(models.categories, {
      foreignKey: "category_id",
      targetKey: "id",
      as: "Category"
    });
  };
  return items;
};
