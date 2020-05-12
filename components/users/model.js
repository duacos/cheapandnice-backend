const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: { type: String, required: true },
  // role isn't really necessary!
  // just in case admin roles are neeced it'd be already set up
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "admin"],
  },

  accessToken: {
    type: String,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
