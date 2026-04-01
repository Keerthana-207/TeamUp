const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Notification = require("../models/Notification"); 
const Team = require("../models/Team");
const Project = require("../models/Project");

// ── GET all notifications for logged-in user ──
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// ── PATCH mark one as read ──
router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { unread: false },
      { new: true }
    );
    if (!notif) return res.status(404).json({ message: "Notification not found" });
    res.json(notif);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
});

// ── PATCH mark all as read ──
router.patch("/read-all", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.id, unread: true }, { unread: false });
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark all as read" });
  }
});

// ── POST clear notifications ──
router.post("/clear", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  try {
    await Notification.deleteMany({ _id: { $in: ids }, userId: req.user.id });
    res.json({ message: "Notifications cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear notifications" });
  }
});

// ── POST accept invite ──
router.post("/:id/accept", authMiddleware, async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notif.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (notif.inviteState === "accepted") {
        return res.status(400).json({ message: "Already accepted" });
    }
    const existingTeam = await Team.findOne({
    members: { $all: [notif.senderId, notif.userId] },
    name: `${notif.hackathonTitle} Team`
    });

    if (existingTeam) {
    return res.status(400).json({ message: "Team already exists" });
    }

    // ✅ Members = sender + receiver
    const members = [notif.senderId, notif.userId];

    // ✅ Create Project
    const project = new Project({
      name: notif.hackathonTitle,
      description: "Auto-created project",
      domain: "General",
      createdBy: notif.senderId,
      collaborators: members.map(userId => ({
        user: userId,
        role: "editor"
      }))
    });

    await project.save();

    // ✅ Create Team
    const team = new Team({
      name: `${notif.hackathonTitle} Team`,
      project: project._id,
      members,
      lead: notif.senderId
    });

    await team.save();

    // ✅ Update notification
    notif.inviteState = "accepted";
    notif.unread = false;
    await notif.save();

    res.json({
      message: "Invite accepted & team created",
      team,
      project
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to accept invite" });
  }
});

// ── POST decline invite ──
router.post("/:id/decline", authMiddleware, async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { inviteState: "declined", unread: false },
      { new: true }
    );
    res.json(notif);
  } catch (err) {
    res.status(500).json({ message: "Failed to decline invite" });
  }
});

// ── POST send invite ──
router.post("/invite", authMiddleware, async (req, res) => {
  try {
    const { receiverId, hackathonTitle, teamSize } = req.body;

    const newNotif = new Notification({
      userId: receiverId,
      senderId: req.user.id,
      type: "invite",
      title: "Team Invitation",
      bodyText: `You have been invited to join a team for ${hackathonTitle}`,
      bodyHTML: "",
      hackathonTitle,
      teamSize,
      unread: true,
      inviteState: null,
      actions: "invite",
      date: "Today", // you can improve later
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    await newNotif.save();

    res.json({ message: "Invite sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send invite" });
  }
});

module.exports = router;