const users = require("../components/users/netwotk").router;
const products = require("../components/products/network");
const cart = require("../components/cart/network");

function router(app) {
  app.use("/api/users", users);
  app.use("/api/products", products);
  app.use("/api/cart", cart);
}

module.exports = router;
