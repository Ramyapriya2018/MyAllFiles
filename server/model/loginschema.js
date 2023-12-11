const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const loginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
loginSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const register = mongoose.model("hashed", loginSchema);

module.exports = register;
