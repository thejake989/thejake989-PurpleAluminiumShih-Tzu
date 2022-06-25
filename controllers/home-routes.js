const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Choices, Vote } = require("../models");

// Render the home page
router.get("/", (req, res) => {
  res.render("homepage");
});
