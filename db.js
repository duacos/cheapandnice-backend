const mongoose = require("mongoose");

async function connect(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("[db]", err.message);
  }
}

module.exports = connect;
