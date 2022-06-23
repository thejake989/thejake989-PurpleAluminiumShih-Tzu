const User = require("./User");
const Poll = require("./Poll");

// User associations
User.hasMany(Poll, {
  foreignKey: "user_id",
});

// Poll associations
Poll.belongsTo(User, {
  foreignKey: "user_id",
});
