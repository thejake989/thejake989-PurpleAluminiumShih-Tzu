const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Choices, Vote } = require("../models");

// Render the home page
router.get("/", async (req, res) => {
  try {
    if (req.session.username) {
      res.render("homepage", {
        username: req.session.username,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.render("homepage", {
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render Login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Render Signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Render all polls
router.get("/polls", async (req, res) => {
  try {
    const dbData = await Poll.findAll({
      attributes: ["id", "title", "is_open"],
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    const polls = dbData.map((poll) => poll.get({ plain: true }));
    res.render("polls", {
      polls,
      username: req.session.username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {}
});

module.exports = router;
