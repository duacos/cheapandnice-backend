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

// read form the body or from a query
async function getSearched(searchBody, searchQuery) {
  //  if query isn't provided, read body
  if (!searchQuery) {
    // if body is empty return empty string
    if (!searchBody) return [];
    return await store.getSearchedProduct(searchBody);
  } else {
    return await store.getSearchedProduct(searchQuery);
  }
}

module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
  getFiltered,
  getSearched,
};
