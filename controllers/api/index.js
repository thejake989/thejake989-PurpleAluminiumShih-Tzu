const router = require("express").Router();

const userRoutes = require("./user-routes");
const pollRoutes = require("./poll-routes");
const choicesRoutes = require("./choices-routes");
const votesRoutes = require("./votes-routes");

router.use("/users", userRoutes);
router.use("/polls", pollRoutes);
router.use("/choices", choicesRoutes);
router.use("/votes", votesRoutes);

module.exports = router;
