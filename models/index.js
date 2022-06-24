const User = require("./User");
const Poll = require("./Poll");
const Choices = require("./Choices");
const Vote = require("./Votes");

// User associations
User.hasMany(Poll, {
  foreignKey: "user_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

// Poll associations
Poll.belongsTo(User, {
  foreignKey: "user_id",
});

Poll.hasMany(Choices, {
  foreignKey: "poll_id",
});

Poll.hasMany(Vote, {
  foreignKey: "poll_id",
});

// Choices associations
Choices.belongsTo(Poll, {
  foreignKey: "poll_id",
});

Choices.hasMany(Vote, {
  foreignKey: "choices_id",
});

// Votes associations
Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Poll, {
  foreignKey: "poll_id",
});

Vote.belongsTo(Choices, {
  foreignKey: "choices_id",
});

module.exports = { User, Poll, Choices, Vote };
