// Import packages
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./controllers");
const session = require("express-session");
const exphbs = require("express-handlebars");

// Initialize handlebars
const hbs = exphbs.create();

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

// Setup template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Expose routes
app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
