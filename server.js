const express = require("express");
const mustacheExpress = require("mustache-express");
const {addHat} = require("./dal");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Hat = require('./models/Hat');
const qs = require('qs');
const assert = require('assert');

const app = express();

let hats = require("./data")

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/add", function(req, res) {
  res.render("add");
});

app.post("/add", function(req, res) {
  let newHat = req.body;
  console.log(req.body);
  addHat(newHat);
  res.render("add", {message:"Hat Successfully Added."});
});

app.get("/list", function(req, res) {
  res.render("list", {hats:hats});
});

app.listen(3000, function () {
  console.log("Hat Collection app started on: 3000");
});
