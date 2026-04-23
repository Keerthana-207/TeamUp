// routes/teamRoutes.js

const express = require("express");
const router = express.Router();

const Team = require("../models/Team");
const Project = require("../models/Project");
const User = require("../models/User");

router.post("/create", async (req, res) => {
  try {
    const {
      teamName,
      projectName,
      description,
      domain,
      members,   // array of userIds
      lead,      // userId
      inviteLink
    } = req.body;

    // ✅ Validate users
    const users = await User.find({ _id: { $in: members } });
    if (users.length !== members.length) {
      return res.status(400).json({ error: "Invalid members" });
    }

    // ✅ Create Project
    const project = new Project({
      name: projectName,
      description,
      domain,
      createdBy: lead,

      collaborators: members.map(userId => ({
        user: userId,
        role: "editor"
      }))
    });

    await project.save();

    // ✅ Create Team
    const team = new Team({
      name: teamName,
      project: project._id,
      members,
      lead,
      inviteLink
    });

    await team.save();

    res.status(201).json({
      team,
      project
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("lead", "fullName email")
      .populate("members", "fullName email profilePhoto")
      .populate({
        path: "project",
        populate: {
          path: "createdBy",
          select: "fullName"
        }
      });

    res.json(teams);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("lead", "fullName email profilePhoto")
      .populate("members", "fullName email profilePhoto")
      .populate({
        path: "project",
        populate: {
          path: "createdBy",
          select: "fullName email"
        }
      });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;