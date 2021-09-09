export default (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        required: true,
        allowNull: false,
        len: [8, 20],
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        len: [7, 100],
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM("super-admin", "admin", "user"),
        required: true,
        allowNull: false,
        defaultValue: 'user'
      }
    },
    {
      paranoid: true,
    }
  );
};
