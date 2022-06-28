const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Vote, Choices } = require("../models");
const withAuth = require("../utils/auth");

// Render dashboard page
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("dashboard", {
      username: req.session.username,
      loggedIn: true,
    });
  } catch (err) {}
});

router.get("/create", async (req, res) => {
  res.render("create-poll");
});

router.get("/create/choices", async (req, res) => {
  res.render("choices");
});

module.exports = router;

//If not working apply the get route - withAuth,
