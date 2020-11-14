const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
  },
  question_id: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Option", optionSchema);
