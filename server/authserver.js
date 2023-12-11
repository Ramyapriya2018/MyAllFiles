const express = require("express");
const jwt = require("jsonwebtoken");
const register = require("./model/loginschema");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const secretKey = process.env.SECRET_KEY || "default_secret";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization") || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

mongoose.connect("mongodb://0.0.0.0:27017/Auth");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new register({ name, email, password: hashedPassword });

    const existingUser = await register.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, secretKey, {
        expiresIn: "1h",
      });

      res.cookie("token", token);

      res.json({ token, message: "Success" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/Auth", verifyToken, async (req, res) => {
  try {
    const user = await register.findOne({ email: req.user.email });
    res.json({ message: `Welcome ${user.name}` });
  } catch {
    err;
  }
});
// app.get("/home", verifyToken, (req, res) => {
//   return res.json("Success");
// });
const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
