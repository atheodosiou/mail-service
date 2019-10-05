const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const dotenv = require("dotenv");
let port = 3000;
const bodyParser = require("body-parser");

dotenv.config();
port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/mail", require("./routes"));

app.listen(port, function() {
  console.log(`Server is up and running on port: ${port}`);
});
