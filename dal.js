const mongoose = require('mongoose');
const Hat = require('./models/Hat');
mongoose.Promise = require('bluebird');
const qs = require('qs');
const assert = require('assert');

let hats = require("./data")

function addHat(hat) {
  let newHat = new Hat(hat);
  newHat.details.fitted = hat.fitted;
  newHat.details.size = hat.size;
  newHat.details.special = hat.special;
  newHat.colors.push(hat.color1);
  newHat.colors.push(hat.color2);
  if (hat.color3 !== "") {
    newHat.colors.push(hat.color3);
  }
  console.log(newHat);
  hats.push(newHat);
  return Promise.resolve('success');
}

module.exports = {addHat}
