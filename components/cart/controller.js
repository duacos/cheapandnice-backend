const store = require("./store");

async function addItem({ productId, quantity }, currentUser) {
  return await store.addItemToCart({ productId, quantity }, currentUser);
}

async function getItems(userId) {
  return store.getAllItems(userId);
}

module.exports = {
  addItem,
  getItems,
};
