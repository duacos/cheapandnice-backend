const db = require("mongoose");

async function connect(uri) {
  try {
    await db.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error("[db]", err.message);
  }
}

module.exports = connect;
