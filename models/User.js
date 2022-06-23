const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create the user model
class User extends Model {}

// define table columns and configurations
User.init(
  {
    // define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate if email
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate for length > 8
      validate: {
        len: [8],
      },
    },
  },
  {
    // hooks go here
    hooks: {
      // before creation of new user
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 3);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          3
        );
        return updatedUserData;
      },
    },

    // pass in connection
    sequelize,

    // don't automatically create time stamps
    timestamps: false,

    // don't pluralize name of table
    freezeTableName: true,

    // use underscores, not camelCase
    underscored: true,

    // set model name as lowercase in db
    modelName: "user",
  }
);
