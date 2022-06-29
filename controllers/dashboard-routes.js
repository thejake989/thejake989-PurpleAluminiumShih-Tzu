const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Vote, Choices } = require("../models");
const { count } = require("../models/User");
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

router.get("/create", withAuth, async (req, res) => {
  res.render("create-poll", {
    username: req.session.username,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/create/choices", async (req, res) => {
  res.render("choices");
});

router.get("/poll/:id", async (req, res) => {
  try {
    const dbData = await Poll.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Choices,
          attributes: [
            "id",
            "choice_name",
            [
              sequelize.literal(
                "(SELECT SUM(rank_value) FROM vote WHERE choices.id = vote.choice_id)"
              ),
              "rank_score",
            ],
          ],
        },
      ],
    });

    const choices = new Object(dbData);
    const list = choices.dataValues.choices.map((option) =>
      option.get({ plain: true })
    );

    res.render("vote-info", {
      username: req.session.username,
      loggedIn: req.session.loggedIn,
      title: choices.dataValues.title,
      // poll id
      id: choices.dataValues.id,
      choices: list,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // res.render("choices-info");
});

router.get("/results/:id", async (req, res) => {
  try {
    const dbData = await Poll.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Vote,
          attributes: [
            [
              sequelize.literal(
                "(SELECT COUNT(DISTINCT(user_id)) FROM vote WHERE vote.poll_id = poll.id)"
              ),
              "voter_count",
            ],
          ],
        },
        {
          model: Choices,
          attributes: [
            "id",
            "choice_name",
            [
              sequelize.literal(
                "(SELECT SUM(rank_value) FROM vote WHERE choices.id = vote.choice_id)"
              ),
              "rank_score",
            ],
          ],
        },
      ],
    });

    const choices = new Object(dbData);
    const list = choices.dataValues.choices.map((option) =>
      option.get({ plain: true })
    );
    const voterCount = choices.dataValues.votes.map((count) =>
      count.get({ plain: true })
    );

    let { voter_count } = voterCount[0];

    res.render("vote-results", {
      username: req.session.username,
      loggedIn: req.session.loggedIn,
      title: choices.dataValues.title,
      is_open: choices.is_open,
      voters: voter_count,
      // poll id
      id: choices.dataValues.id,
      choices: list,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

//If not working apply the get route - withAuth,
