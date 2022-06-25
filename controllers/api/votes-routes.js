const express = require("express");
const router = express.Router();
const { User, Poll, Choices, Vote } = require("../../models");

// GET all votes
router.get("/", async (req, res) => {
  try {
    const dbData = await Vote.findAll({
      attributes: ["id", "user_id", "poll_id", "choice_id", "rank_value"],
    });

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
