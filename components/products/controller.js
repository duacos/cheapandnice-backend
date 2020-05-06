const store = require("./store");

async function addNewProduct(product) {
  if (!product) throw new Error("Product is null");
  return await store.createProduct(product);
}

async function getProduct(productId) {
  if (!productId) throw new Error("ProductId not provided");
  return await store.getOneProduct(productId);
}

async function getProducts() {
  return await store.getAllProducts();
}

async function getFiltered(filter) {
  if (!filter) throw new Error("Filter is missing");
  return await store.getFilteredProducts(filter);
}

async function getSearched(search) {
  if (!search) throw new Error("Search term is missing");
  return await store.getSearchedProduct(search);
}

module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
  getFiltered,
  getSearched,
};
