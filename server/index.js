require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");
const authRoutes = require('./routes/authRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');


const app = express();
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
app.use(express.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));
// app.options("*", cors());
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
app.use('/api/projects', projectRoutes);

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