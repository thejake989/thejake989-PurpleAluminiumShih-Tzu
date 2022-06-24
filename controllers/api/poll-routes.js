const express = require("express");
const router = express.Router();
const { Poll } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all polls
router.get("/", async (req, res) => {
  try {
    const dbData = await Poll.findAll({
      attributes: ["id", "title", "is_open"],
      order: [["created_at", "DESC"]],
    });
    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single poll

// POST a new poll
router.post("/", async (req, res) => {
  try {
    const dbResponse = await Poll.create({
      is_open: req.body.is_open,
      title: req.body.title,
      user_id: req.body.user_id,
    });

    // send user data
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE an existing poll

module.exports = router;
