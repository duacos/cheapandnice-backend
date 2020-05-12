const Model = require("./model");

async function createProduct(product) {
  const newProduct = new Model(product);
  return await newProduct.save();
}

async function getAllProducts() {
  return await Model.find(
    {},
    { _id: 1, title: 1, description: 1, photos: 1, type: 1, price: 1 }
  );
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
