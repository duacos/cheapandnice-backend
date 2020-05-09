const db = require("mongoose");

async function connect(uri) {
  try {
    const resultado = await db.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connect: ", resultado);
  } catch (err) {
    console.error("[db]", err.message);
  }
}

module.exports = connect;
