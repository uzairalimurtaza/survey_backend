const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  survey: [
    {
      question_id: mongoose.Types.ObjectId,
      question: String,
      option_id: mongoose.Types.ObjectId,
      option: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Survey", surveySchema);
