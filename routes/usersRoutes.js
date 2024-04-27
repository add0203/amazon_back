let express = require("express");
const userControllers = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.route("/signIn").post(userControllers.signIn);
userRouter.route("/register").post(userControllers.register);
userRouter.route("/signUp").post(userControllers.signUp);

module.exports = userRouter;
