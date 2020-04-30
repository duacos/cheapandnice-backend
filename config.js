const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

config = {
  port: process.env.PORT,
  domain: "localhost",
  database_url: process.env.DATABASE_URL,
};

module.exports = config;
