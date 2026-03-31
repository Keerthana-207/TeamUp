const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

/* ===========================
   CREATE PROJECT
=========================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      domains,
      skills,
      teamSize,
      rolesNeeded,
      privacy,
    } = req.body;

    const project = new Project({
      name: title,
      description,
      domain: domains[0], // simple (you can extend later)
      visibility: privacy,
      createdBy: req.user.id,
      collaborators: [],
      files: [],
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error("Create Project Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ===========================
   GET MY PROJECTS
=========================== */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({projects});
  } catch (err) {
    console.error("Fetch Projects Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ===========================
   DELETE PROJECT
=========================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;