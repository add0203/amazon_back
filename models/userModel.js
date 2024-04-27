const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    token: "String",
    resetToken: "String",
    expireToken: "String",
  },
  { lastLogin: { type: Date } },
  { timestamps: true }
);

let USERMODEL = mongoose.model("users", userSchema);
module.exports = USERMODEL;
