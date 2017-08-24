const mongoose = require('mongoose');
const Hat = require('./models/Hat');
mongoose.Promise = require('bluebird');

let hats = require("./data")

function addHat(hat) {
  let newHat = new Hat(hat);
  hats.push(newHat);
  return Promise.resolve('success');
}

module.exports = {addHat}
