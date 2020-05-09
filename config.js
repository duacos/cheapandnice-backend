const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

config = {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  database_url: process.env.DATABASE_URL,
};

module.exports = config;
