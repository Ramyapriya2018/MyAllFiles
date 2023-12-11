// const register = require("./model/loginschema");
// const cors = require("cors");
// const app = express();
// app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://0.0.0.0:27017/Signup");

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   register.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Success");
//       } else {
//         res.json("The Password is incorrect");
//       }
//     } else {
//       res.json("No Record Exists");
//     }
//   });
// });

// // app.post("/signup", (req, res) => {
// //   register.create(req.body).then((register) => res.json(register));
// // });
// // ...

// app.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;

//   register
//     .findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         res.status(400).json({ error: "Email already exists" });
//       } else {
//         register
//           .create({ name, email, password })
//           .then((newUser) => res.json(newUser))
//           .catch((error) =>
//             res.status(500).json({ error: "Error creating user" })
//           );
//       }
//     })
//     .catch((error) => res.status(500).json({ error: "Database error" }));
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });
// port = 8000;
// app.listen(8000, () => {
//   console.log("port connected on", { port });
// });

// // const express = require("express");
// // const jwt = require("jsonwebtoken");
// // const register = require("./model/loginschema");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const bcrypt = require("bcrypt");

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // const verifyToken = (req, res, next) => {
// //   const token = req.header("Authorization");

// //   if (!token) {
// //     return res
// //       .status(401)
// //       .json({ message: "Access denied. Token not provided." });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, "Ramya");
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // mongoose.connect("mongodb://0.0.0.0:27017/Signup");

// // const db = mongoose.connection;

// // db.on("error", console.error.bind(console, "connection error:"));
// // db.once("open", function () {
// //   console.log("Connected to MongoDB");
// // });

// // app.post("/signup", async (req, res) => {
// //   const { name, email, password } = req.body;

// //   try {
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = new register({ name, email, password: hashedPassword });

// //     const existingUser = await register.findOne({ email: email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: "Email already exists" });
// //     }

// //     await user.save();
// //     res.json({ message: "Registration successful" });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Error creating user" });
// //   }
// // });

// // app.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await register.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     bcrypt.compare(password, user.password, (err, result) => {
// //       if (result) {
// //         const token = jwt.sign({ email: user.email }, "Ramya");
// //         res.json({ token, message: "Success" });
// //       } else {
// //         res.status(401).json({ message: "Incorrect password" });
// //       }
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // app.get("/Signup", verifyToken, (req, res) => {
// //   res.json({ message: "Access granted!" });
// // });

// // const port = 4000;
// // app.listen(port, () => {
// //   console.log("Server is running on port", port);
// // });
