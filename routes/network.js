const users = require("../components/users/netwotk").router;

function router(app) {
  app.use("/api/users", users);
}

module.exports = router;
