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
app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
db(config.database_url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

routerNetwork(app);

app.listen(config.port || 8080);
console.log(`Server is running on port ${config.port}`);
