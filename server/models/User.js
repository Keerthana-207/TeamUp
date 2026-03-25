const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Mentor", "Admin"],
        required: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    yearOfStudy: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    github: String,
    linkedin: String,
    instagram: String,
    youtube: String,
    bio: {
        type: String,
        maxlength: 200
    },
    profilePhoto: {
        type: String // store URL (Cloudinary / S3)
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);