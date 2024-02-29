const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    username: { type: String },
    password: { type: String, required: [true, "can't be blank"] },
    role: { type: String, enum: ["admin", "user", "host"], default: "user" },
    contests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
