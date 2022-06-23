const User = require("./User");
const Poll = require("./Poll");
const Choices = require("./Choices");

// User associations
User.hasMany(Poll, {
  foreignKey: "user_id",
});

// Poll associations
Poll.belongsTo(User, {
  foreignKey: "user_id",
});

Poll.hasMany(Choices, {
  foreignKey: "poll_id",
});

// Choices associations
Choices.belongsTo(Poll, {
  foreignKey: "poll_id",
});
