"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderBookings = sequelize.define(
    "OrderBookings",
    {
      customer_id: DataTypes.INTEGER,
      event_date: DataTypes.STRING,
      booking_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      event_date_start: DataTypes.DATEONLY,
      gross_amount: DataTypes.STRING,
      discount: DataTypes.STRING,
      total_amount: DataTypes.STRING,
      vehicle_charges: DataTypes.STRING,
      service_expense: DataTypes.STRING,
      received_amount: DataTypes.STRING,
      balance_amount: DataTypes.STRING,
      expense_items: DataTypes.STRING,
      is_due_amount: DataTypes.STRING,
      complete: DataTypes.BOOLEAN,
      is_closed: DataTypes.BOOLEAN,
      is_void: DataTypes.BOOLEAN,
      no_of_person: DataTypes.STRING,
      per_head_amount: DataTypes.STRING,
      location_address: DataTypes.STRING,
      order_title: DataTypes.STRING
    },
    {}
  );
  OrderBookings.associate = function(models) {
    // associations can be defined here
    models.customers.hasMany(OrderBookings, {
      foreignKey: "customer_id",
      sourceKey: "id",
      as: "order_customer_id"
    });
    OrderBookings.belongsTo(models.customers, {
      foreignKey: "customer_id",
      targetKey: "id",
      as: "order_customer"
    });
  };
  return OrderBookings;
};
