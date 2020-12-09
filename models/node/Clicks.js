const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  option_id: {
    type: mongoose.Types.ObjectId,
  },
  option: {
    type: String,
  },
  question: {
    type: String,
  },
  topic_id:{
    type: mongoose.Types.ObjectId,
  },
  question_id: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Click", clickSchema);
