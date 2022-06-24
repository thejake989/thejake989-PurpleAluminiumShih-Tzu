// Import packages
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./controllers");

// Create express server
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
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

app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
