require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");
const authRoutes = require('./routes/authRoutes.js');


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

app.use('/api/auth', authRoutes);

// app.post('/register', upload.single("profilePhoto"), async (req, res) => {
//     try {
//         const userData = req.body;

//         // hash password
//         const salt = await bcrypt.genSalt(10);
//         userData.password = await bcrypt.hash(userData.password, salt);

//         if (req.file) {
//             userData.profilePhoto = req.file.filename;
//         }

//         const user = await userModel.create(userData);
//         res.json(user);

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

app.listen(3001, () => {
    console.log('App is running')
})