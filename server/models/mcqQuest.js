const mongoose = require("mongoose");
const mcqQuestSchema = new mongoose.Schema(
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
    a: {
      type: String,
      required: true,
    },
    b: {
      type: String,
      required: true,
    },
    c: {
      type: String,
      required: true,
    },
    d: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("MCQQuest", mcqQuestSchema);
