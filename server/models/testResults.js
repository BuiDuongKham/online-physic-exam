const mongoose = require("mongoose");
const testResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    answers: [
      {
        idQuestion: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    testScores: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("testResult", testResultSchema);
