'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookingItems = sequelize.define(
    'bookingItems',
    {
      product_id: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      event_booking_start: DataTypes.DATEONLY,
      event_booking_end: DataTypes.DATEONLY,
      order_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      order_quantity: DataTypes.INTEGER,
      order_item_price: DataTypes.STRING
    },
    {}
  );
  bookingItems.associate = function(models) {
    // associations can be defined here
    models.items.hasMany(bookingItems, {
      foreignKey: 'product_id',
      sourceKey: 'id',
      as: 'Product_Booking_Id'
    });
    bookingItems.belongsTo(models.items, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'Product_Booking_Key'
    });
    models.customers.hasMany(bookingItems, {
      foreignKey: 'customer_id',
      sourceKey: 'id',
      as: 'Customer Booking Id'
    });
    bookingItems.belongsTo(models.customers, {
      foreignKey: 'customer_id',
      targetKey: 'id',
      as: 'Customer'
    });
    models.OrderBookings.hasMany(bookingItems, {
      foreignKey: 'order_id',
      sourceKey: 'id',
      as: 'Order Booking Id'
    });
    bookingItems.belongsTo(models.OrderBookings, {
      foreignKey: 'order_id',
      targetKey: 'id',
      as: 'Orders'
    });
  };
  return bookingItems;
};
