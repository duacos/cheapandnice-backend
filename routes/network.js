const users = require("../components/users/netwotk").router;
const products = require("../components/products/network");

function router(app) {
  app.use("/api/users", users);
  app.use("/api/products", products);
}

module.exports = router;
