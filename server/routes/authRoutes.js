const express = require("express");
const router = express.Router();

const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Register
router.post("/register", upload.single("profilePhoto"), async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            role,
            college,
            department,
            yearOfStudy,
            skills,
            interests,
            github,
            linkedin,
            instagram,
            youtube,
            bio
        } = req.body;

        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🖼️ Handle profile photo
        const profilePhoto = req.file ? req.file.path : "";

        // ⚠️ Parse skills & interests (from FormData)
        let parsedSkills = [];
        let parsedInterests = [];

        try {
            parsedSkills = skills ? JSON.parse(skills) : [];
            parsedInterests = interests ? JSON.parse(interests) : [];
        } catch (err) {
            return res.status(400).json({ message: "Invalid skills/interests format" });
        }

        // 👤 Create user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            college,
            department,
            yearOfStudy,
            skills: parsedSkills,
            interests: parsedInterests,
            github,
            linkedin,
            instagram,
            youtube,
            bio,
            profilePhoto
        });

        await newUser.save();

        // 🔑 Generate JWT (auto-login)
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ✅ Response
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try{
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({email});
    if (!user){
        return res.status(400).json({message:'User not found'});
    }
    
    // Password Match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({message:'Invalid Credentials'});
    }

    // JWT Token
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    res.json({
        message: 'Login successful',
        token,
        user
    })
    } catch(err){
        return res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router;