"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      OrderProductTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      quantity: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
        required: true,
      },
    },
    {
      paranoid: true,
    }
  );
};
