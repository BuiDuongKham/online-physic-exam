const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contestRoute = require("./routes/contestRoutes");
const participantRoute = require("./routes/participant");
const result = require("./routes/testResults");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

// register the route
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contest", contestRoute);
app.use("/api/participant", participantRoute);
app.use("/api/result", result);

// 1 api /api/search?contestId=...&userId=...


const server = http.createServer(app);

// Kết nối tới MongoDB
mongoose
  .connect("mongodb://127.0.0.1/examOnline")
  .then(async () => {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      const encryptedPassword = await bcrypt.hash("12345678a", 10);
      const newAdminUser = new User({
        email: "admin@gmail.com",
        username: "admin",
        password: encryptedPassword,
        role: "admin",
      });

      // Lưu người dùng admin vào cơ sở dữ liệu
      await newAdminUser.save();
      console.log("Admin user created.");
    }

    server.listen(5000, "0.0.0.0", () => {
      console.log(`SERVER STARTED ON ${5000}.....!`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });
