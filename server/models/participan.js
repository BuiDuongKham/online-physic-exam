const mongoose = require("mongoose");
const participantSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);
