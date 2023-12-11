const express = require("express");
const jwt = require("jsonwebtoken");
const register = require("./model/loginschema");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/Auth");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Middleware to verify email
const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new register({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const existingUser = await register.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await user.save();

    // Send verification email with a unique token
    const verificationToken = jwt.sign(
      { email: user.email },
      "VerificationSecret",
      {
        expiresIn: "1d", // Token expires in 1 day
      }
    );

    const transporter = nodemailer.createTransport({
      /* Configure nodemailer transporter for sending emails */
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: user.email,
      subject: "Verify Your Email",
      html: `
        <p>Click the following button to verify your email:</p>
        <a href="http://your-app.com/verify/${verificationToken}" style="padding: 10px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });

    res.json({
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, "VerificationSecret");
    const user = await register.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mark the user as verified in the database
    user.isVerified = true;
    await user.save();

    res.redirect("http://your-app.com/login"); // Redirect to your login page
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ message: "Invalid verification token" });
  }
});

app.post("/login", verifyEmail, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password.trim(), user.password);

    if (passwordMatch) {
      if (!user.isVerified) {
        return res.status(401).json({ message: "Email not verified" });
      }

      // Proceed with the regular login process
      const token = jwt.sign({ email: user.email }, "Himalayas", {
        expiresIn: "1h",
      });

      res.json({ token, message: "Success" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
