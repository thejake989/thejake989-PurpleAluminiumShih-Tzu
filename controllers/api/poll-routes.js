const e = require("express");
const express = require("express");
const router = express.Router();
const { Poll, User } = require("../../models");
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
router.get("/:id", async (req, res) => {
  try {
    const dbData = await Poll.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dbData) {
      res.status(404).json({ message: "No poll found with this ID" });
      return;
    }

    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

// Update the 'is_open' for a single poll
router.put("/:id", async (req, res) => {
  try {
    const dbResponse = await Poll.update(
      { is_open: req.body.is_open },
      { where: { id: req.params.id } }
    );

    if (!dbResponse[0]) {
      res.status(404).json({ message: "No poll found with this ID" });
      return;
    }

    res.json({
      message: `Poll with ID #${req.params.id} successfully updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE an existing poll
router.delete("/:id", async (req, res) => {
  try {
    const dbResponse = await Poll.destroy({
      where: { id: req.params.id },
    });

    if (!dbResponse) {
      res.status(404).json({ message: "No poll was found with this ID" });
      return;
    }

    res.json({
      message: `Poll with ID #${req.params.id} successfully deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
