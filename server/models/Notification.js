const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  type: { 
    type: String, 
    enum: ["invite","hackathon","deadline","result","follow","system"], 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  bodyText: { 
    type: String, 
    required: true 
  },
  bodyHTML: { 
    type: String 
  },
  unread: { 
    type: Boolean, 
    default: true 
  },
  inviteState: {
    type: String, 
    enum: ["accepted","declined", null], 
    default: null 
  },
  actions: { 
    type: String, 
    enum: ["invite","view","none"], 
    default: "view" 
  },
  viewLabel: { 
    type: String,
    default: "View"
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },
  relatedType: {
    type: String,
    enum: ["hackathon","team","user"]
  },
  teamSize: {
  type: Number,
  default: 4
},
hackathonTitle: {
  type: String
}
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);

