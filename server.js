const express = require("express");
const mustacheExpress = require("mustache-express");
const {addHat, getHatByIdTeam} = require("./dal");
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
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/add", function(req, res) {
  res.render("add");
});

app.get("/edDel", function(req, res) {
  res.render("edDel");
});

app.post("/add", function(req, res) {
  let newHat = req.body;
  addHat(newHat);
  res.render("add", {message:"Hat Successfully Added."});
});

app.post("/edDel", function(req, res) {
  console.log(req.body);
  let selection = req.body;
  getHatByIdTeam(selection, hats);
  res.redirect("/");
});

app.get("/list", function(req, res) {
  res.render("list", {hats:hats});
});

app.listen(3000, function () {
  console.log("Hat Collection app started on: 3000");
});
