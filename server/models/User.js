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
    type: [
        {
        name: {
            type: String,
            required: true,
            trim: true
        },
        score: {
            type: Number,
            min: 0,
            max: 100
        },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Expert"]
        }
        }
    ],
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
    },
    rating: {
    avg: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    }
},
    connections: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);