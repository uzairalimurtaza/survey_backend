const mongoose = require("mongoose");

const linkedTopicsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  topic_id:{
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("LinkedTopics", linkedTopicsSchema);
