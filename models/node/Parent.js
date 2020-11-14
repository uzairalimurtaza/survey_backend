const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Parent", parentSchema);
