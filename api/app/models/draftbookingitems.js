'use strict';
module.exports = (sequelize, DataTypes) => {
  const draftItems = sequelize.define('draftItems', {
    product_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    event_booking_start: DataTypes.DATEONLY,
    event_booking_end: DataTypes.DATEONLY,
    draft_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    order_quantity: DataTypes.INTEGER,
    order_item_price: DataTypes.STRING
  }, {});
  draftItems.associate = function(models) {
    // associations can be defined here
    models.items.hasMany(draftItems, {
      foreignKey: "product_id",
      sourceKey: "id",
      as: "Draft Product Booking Id"
    });
    draftItems.belongsTo(models.items, {
      foreignKey: "product_id",
      targetKey: "id",
      as: "Draft Product"
    });
    models.customers.hasMany(draftItems, {
      foreignKey: "customer_id",
      sourceKey: "id",
      as: "Draft Customer Booking Id"
    });
    draftItems.belongsTo(models.customers, {
      foreignKey: "customer_id",
      targetKey: "id",
      as: "Draft Customer"
    });
    models.DraftBookings.hasMany(draftItems, {
      foreignKey: "draft_id",
      sourceKey: "id",
      as: "Draft Booking Id"
    });
    draftItems.belongsTo(models.DraftBookings, {
      foreignKey: "draft_id",
      targetKey: "id",
      as: "Draft"
    });
  };
  return draftItems;
};