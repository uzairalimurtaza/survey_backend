const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  survey: {
    type: [mongoose.Types.ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
