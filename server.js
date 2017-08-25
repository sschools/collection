const express = require("express");
const mustacheExpress = require("mustache-express");
const {addHat, getHatByIdTeam, getHatById, deleteHat, updateHats} = require("./dal");
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
  let selection = req.body;
  selectedHats = getHatByIdTeam(selection, hats);
  let editDel = true;
  res.render("list", {hats:selectedHats, editDel:editDel});
});

app.get("/list", function(req, res) {
  res.render("list", {hats:hats});
});

app.post("/list", function(req, res) {
  if (req.body.editHat) {
    singleHat = getHatById(req.body.editHat, hats);
    return res.render("editScreen", {singleHat});
  } else if (req.body.delHat){
    singleHat = getHatById(req.body.delHat, hats);
    let temp = deleteHat(singleHat, hats);
    hats = temp;
    return res.render("list", {hats:hats});
  } else {
    singleHat = req.body;
    let temp = updateHats(singleHat, hats);
    hats = temp;
    return res.render("list", {hats:hats});
  }
});

app.listen(3000, function () {
  console.log("Hat Collection app started on: 3000");
});
