"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        required: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        required: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      category: {
        type: DataTypes.ENUM("laptop", "phone", "accessories"),
        allowNull: false,
        required: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
    },
    {
      paranoid: true,
    }
  );
};
