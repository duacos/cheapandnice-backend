const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const db = require("./db");
const cookieParser = require("cookie-parser");
const routerNetwork = require("./routes/network");

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

// Mongo atlas configuration -> see db.js
db(config.database_url);

app.use(
  cors({
    origin: config.origin,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Main routes see routes/network.js
routerNetwork(app);

app.listen(config.port || 8080);
console.log(`Server is running on port ${config.port}`);
