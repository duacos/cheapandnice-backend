const db = require("mongoose");

async function connect(uri) {
  await db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

module.exports = connect;
