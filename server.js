// Import packages
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./controllers");
const session = require("express-session");

// Create express server
const app = express();
const PORT = process.env.PORT || 3001;

// Establish session
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Express middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// TESTING TEMPLATE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", (req, res) => {
  res.render("test");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/main", (req, res) => {
  res.render("main");
});

app.get("/homepage", (req, res) => {
  res.render("homepage");
});

app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
