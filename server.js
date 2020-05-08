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
db(config.database_url);

app.use(
  cors({
    origin: config.allowedDomain,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));
app.use(cookieParser());

routerNetwork(app);

app.listen(config.port || 80);
console.log(`Server is running on port ${config.port}`);
