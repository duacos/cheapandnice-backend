const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: { type: String, required: true },

  photos: [
    {
      type: String,
    },
  ],

  type: {
    type: String,
    require: true,
    enum: ["fashion", "books", "art", "photography", "baby"],
  },
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
