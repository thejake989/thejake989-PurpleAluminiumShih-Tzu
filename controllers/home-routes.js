const router = require("express").Router();
const sequelize = require("../config/connection");
const { Poll, User, Choices, Vote } = require("../models");

// Render the home page
router.get("/", (req, res) => {
  res.render("homepage");
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
