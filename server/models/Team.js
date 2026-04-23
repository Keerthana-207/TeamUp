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
  description: { type: String, default: null },
  domain: { type: String, default: null },
  status: { type: String, default: "active" },
  color: { type: String, default: null },
  domainIcon: { type: String, default: null },

  activity: { type: Array, default: null },

  inviteLink: String,

}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);