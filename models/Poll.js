const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Poll model
class Poll extends Model {}

// define columns and configurations
Poll.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    is_open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "poll",
  }
);

module.exports = Poll;
