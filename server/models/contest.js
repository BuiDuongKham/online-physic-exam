const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fillInBlankQuests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FillInBlankQuest",
      },
    ],
    mcqQuests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MCQQuest",
      },
    ],
    participant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);
