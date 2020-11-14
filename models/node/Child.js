const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  parent: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Child", childSchema);
