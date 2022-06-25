const express = require("express");
const router = express.Router();
const { User, Poll, Choices } = require("../../models");

// GET all choices
router.get("/", async (req, res) => {
  try {
    const dbData = await Choices.findAll({
      attributes: ["id", "choice_name"],
      include: [
        {
          model: Poll,
          attributes: ["id", "title"],
        },
      ],
    });
    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST new choice
router.post("/", async (req, res) => {
  try {
    const dbResponse = await Choices.create({
      choice_name: req.body.choice_name,
      poll_id: req.body.poll_id,
      user_id: req.body.user_id,
    });

    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update choice
router.put("/:id", async (req, res) => {
  try {
    const dbResponse = await Choices.update(
      { choice_name: req.body.choice_name },
      { where: { id: req.params.id } }
    );

    if (!dbResponse) {
      res.status(404).json({ message: "No choices found with this ID" });
      return;
    }

    res.json({
      message: `Choice with ID #${req.params.id} successfully updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE choice

module.exports = router;
