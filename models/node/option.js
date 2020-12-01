const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
  },
  question_id: {
    type: mongoose.Types.ObjectId,
  },
  next_question_id: {
    type: mongoose.Types.ObjectId,
  },
  topic_id: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "unlinked"
  },
});

module.exports = new mongoose.model("Option", optionSchema);
