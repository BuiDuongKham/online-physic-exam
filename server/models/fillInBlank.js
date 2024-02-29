const mongoose = require("mongoose");
const fillInBlankQuestSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    lowerBound: {
      type: Number,
      required: true,
    },
    upperBound: {
      type: Number,
      required: true,
    },
    imageBase64: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("FillInBlankQuest", fillInBlankQuestSchema);
