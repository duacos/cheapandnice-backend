const Model = require("./model");

async function createProduct(product) {
  const newProduct = new Model(product);
  return await newProduct.save();
}

async function getAllProducts() {
  return await Model.find({});
}

async function getFilteredProducts(filter) {
  return await Model.find({ type: filter });
}

async function getSearchedProduct(searchValue) {
  return await Model.find({ $text: { $search: searchValue } }).catch((e) => {
    throw new Error(e.message);
  });
}

async function getOneProduct(productId) {
  return await Model.findById(productId);
}

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  getSearchedProduct,
  getFilteredProducts,
};
