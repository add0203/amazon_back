const express = require("express");

const router = express.Router();

router.get("/signup", async (req, res) => {
  return res.render("signUp");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

router.get("/products", async (req, res) => {
  return res.render("products");
});

module.exports = router;
