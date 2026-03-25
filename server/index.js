require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const userModel = require('./models/User.js');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/register', upload.single("profilePhoto"), async (req, res) => {
    try {
        const userData = req.body;

        // file info
        if (req.file) {
            userData.profilePhoto = req.file.filename;
        }

        const user = await userModel.create(userData);
        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(3001, () => {
    console.log('App is running')
})