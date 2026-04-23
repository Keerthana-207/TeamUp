require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");
const authRoutes = require('./routes/authRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js')


const app = express();
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

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
app.use('/api/teams', teamRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3001, () => {
    console.log('App is running')
})