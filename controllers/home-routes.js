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
  // SET UP REDIRECT LATER

  // if(req.session.loggedIn) {
  //   res.redirect("/")
  //   return
  // }
  res.render("login");
});
// Render Signup
router.get("/signup", (req, res) => {
  // SET UP REDIRECT LATER

  // if(req.session.loggedIn) {
  //   res.redirect("/")
  //   return
  // }
  res.render("signup");
});
module.exports = router;
