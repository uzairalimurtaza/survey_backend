const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  option_id: {
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
    default: "Pending"
  },
});

module.exports = new mongoose.model("Question", questionSchema);
