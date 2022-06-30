const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Choices extends Model {
  static rank(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      poll_id: body.poll_id,
      choice_id: body.id,
      rank_value: body.rank_value,
    });
  }
}

Choices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onDelete: "cascade",
    },
    choice_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "poll",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "choices",
  }
);

module.exports = Choices;
