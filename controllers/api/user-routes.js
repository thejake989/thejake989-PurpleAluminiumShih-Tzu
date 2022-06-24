const router = require("express").Router();

// TO DO: Import models
const { User } = require("../../models");

// Import authentication middleware
const withAuth = require("../../utils/auth");

// GET all users
router.get("/", async (req, res) => {
  try {
    const dbData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(dbData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by id
router.get("/:id", async (req, res) => {
  try {
    const dbData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      // TO DO: Include the polls this user has created
    });
    if (!dbData) {
      res.status(404).json({ message: "No user with this ID" });
      return;
    }
    res.json(dbData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post("/", async (req, res) => {
  try {
    const dbResponse = User.create({
      username: req.body.username, // <-- Should we track usernames?
      email: req.body.email,
      password: req.body.password,
    });

    // Save session
    req.session.save(() => {
      req.session.user_id = dbResponse.id;
      req.session.username = dbResponse.username;
      req.session.loggedIn = true;

      // Send user data to client
      res.json(dbResponse);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST login a user
router.post("/login", async (req, res) => {
  try {
    const dbData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbData) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    // Validate password
    const isPasswordValid = dbData.checkPassword(req.body.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    // Save session
    req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.loggedIn = true;

      // Send user data and display message to indicate user has logged in
      res.json({ user: dbData, message: "Successfully logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST logout a user
router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// TO DO: Update user with PUT route
// TO DO: Delete user with DELETE route
