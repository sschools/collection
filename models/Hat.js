const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique:true},
  team: { type: String, required:true },
  logo: { type: String },
  details: {
    fitted: {type: Boolean},
    size: {type: String},
    special: {type: String}
  },
  colors: {type: Array}
});

const Robot = mongoose.model('Robot', RobotSchema);

module.exports = Robot;
