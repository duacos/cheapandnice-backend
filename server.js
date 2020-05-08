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
    origin: config.allowedDomain,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
db(config.database_url);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.allowedDomain);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));
app.use(cookieParser());

routerNetwork(app);

app.listen(config.port);
console.log(`Server is running on port ${config.port}`);
