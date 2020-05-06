const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  price: { type: Number, required: true },

  description: { type: String, required: true },

  photos: [
    [
      {
        type: String,
      },
    ],
  ],

  type: {
    type: String,
    required: true,
    enum: ["fashion", "technology", "art", "photography"],
  },
});

schema.index({ title: "text" });

const Product = mongoose.model("Product", schema);

module.exports = Product;
