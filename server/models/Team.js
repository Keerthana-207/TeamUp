// models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  // 🔥 Reference Project
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  // 👥 Users
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  inviteLink: String,

}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);