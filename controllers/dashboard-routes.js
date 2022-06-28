const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Vote, Choices } = require("../models");
const withAuth = require("../utils/auth");

// Render dashboard page
router.get("/", withAuth, (req, res) => {
  // Get data from database
  res.render("dashboard", {
    loggedIn: true,
  });
});

router.get("/create", async (req, res) => {
  res.render("create-poll");
});

module.exports = router;

//If not working apply the get route - withAuth,
