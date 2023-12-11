// const express = require("express");
// const mongoose = require("mongoose");
// const Form = require("./formmodel");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const PORT = process.env.PORT || 3000;
// mongoose.connect("mongodb://127.0.0.1:27017/fromdb");

// // const db = mongoose.connection;

// // db.on("error", (err) => {
// //   console.error("MongoDB connection error:", err);
// // });

// // db.once("open", () => {
// //   console.log("Connected to MongoDB");
// // });
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(cors());

// app.post("/", async (req, res) => {
//   try {
//     const formData = await Form.create(req.body);

//     res.json(formData);
//   } catch (error) {
//     console.error("Error saving form data:", error);
//     res.status(500).json({ message: "Failed to save form data" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
