const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Vote, Choices } = require("../models");
const withAuth = require("../utils/auth");

// Render dashboard page
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPollData = await Poll.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "is_open"],
    });

    const polls = dbPollData.map((poll) => poll.get({ plain: true }));

    res.render("dashboard", {
      polls,
      username: req.session.username,
      loggedIn: true,
    });
  } catch (err) {}
});

router.get("/create", async (req, res) => {
  res.render("create-poll", {
    username: req.session.username,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/create/choices", async (req, res) => {
  res.render("choices");
});

module.exports = router;

//If not working apply the get route - withAuth,
