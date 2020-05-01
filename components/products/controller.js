const store = require("./store");

async function addNewProduct(product) {
  return await store.createProduct(product);
}

async function getProducts() {
  return await store.getAllProducts();
}

module.exports = {
  addNewProduct,
  getProducts,
};
