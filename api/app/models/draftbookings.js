"use strict";
module.exports = (sequelize, DataTypes) => {
  const DraftBookings = sequelize.define(
    "DraftBookings",
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
      no_of_person: DataTypes.STRING,
      per_head_amount: DataTypes.STRING,
      draft_title: DataTypes.STRING,
      location_address: DataTypes.STRING
    },
    {}
  );
  DraftBookings.associate = function(models) {
    // associations can be defined here
    models.customers.hasMany(DraftBookings, {
      foreignKey: "customer_id",
      sourceKey: "id",
      as: "Draft Booking Customer Booking Id"
    });
    DraftBookings.belongsTo(models.customers, {
      foreignKey: "customer_id",
      targetKey: "id",
      as: "draft_customer"
    });
  };
  return DraftBookings;
};
