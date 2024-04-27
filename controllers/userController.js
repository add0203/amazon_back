const UserSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const { generateToken } = require("../helper/jwt");
// 24-04-24

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || !password.length >= 6) {
      return res.status(401).send("field missing");
    }
    const userExists = await UserSchema.findOne({ email });
    if (!userExists) {
      res.status(401).send("user not exist");
    }
    const compare = await userExists.comparePassword(password);
    if (!compare) {
      res.status(401).send("Password not match");
    }

    const Token = generateToken(userExists._id, userExists.name, req, res);
    console.log(Token);
    userExists.token = Token;
    console.log(userExists.token);
    await userExists.save();

    res.status(200).send("user login");
  } catch (error) {
    console.log(error);
    return res.status(200).send(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      return res.status(400).send("Invalid or missing field(s)");
    }

    const userExists = await UserSchema.findOne({ email: email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const user = await UserSchema.create({
      email: email,
      password: password,
    });

    if (!user) {
      return res.status(500).send("User creation failed");
    }

    const token = generateToken(user._id, user.name, req, res);
    user.token = token;

    await user.save();

    return res.status(200).send("User created successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Internal server error");
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await UserSchema.create({
    name,
    email,
    password,
  });

  // res.render("home");
  return res.redirect("/api/products");
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserSchema.findOne({ email });

    const sessionId = uuidv4();
    // console.log(userExist);

    if (!userExist) return res.render("authError");

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.render("authError");
    } else {
      setUser(sessionId, userExist);
      return res.cookie("uid", sessionId).redirect("/api/products");
    }
  } catch (error) {
    console.log(error);
  }

  // res.render("home");
};

module.exports = {
  signIn,
  register,
  signUp,
  logIn,
};
