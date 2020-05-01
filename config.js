const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

config = {
  port: process.env.PORT,
  allowedDomain: process.env.DOMAIN,
  database_url: process.env.DATABASE_URL,
};

module.exports = config;
