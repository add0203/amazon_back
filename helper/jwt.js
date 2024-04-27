// const JWT = require("jsonwebtoken");
// const JWT_SECRET = "hello";

// // const asyncHandler = require("express-async-handler");

// exports.generateToken = (userId, req, res) => {
//   try {
//     let token = JWT.sign({ userId }, JWT_SECRET, {
//       expiresIn: "10d",
//     });
//     if (!token) {
//       return res.send("token genration failed");
//     }

//     // res.status(200).header("key", token);
//     // res.header("key-token", token);
//     return res.send(`Token generated successfully : ${token}`);
//     // return token;
//   } catch (error) {
//     return res.send(`error : ${error}`);
//   }
// };

const JWT = require("jsonwebtoken");
const JWT_SECRET = "hello";

exports.generateToken = (userId, req, res) => {
  try {
    let token = JWT.sign({ userId }, JWT_SECRET, {
      expiresIn: "10d",
    });
    if (!token) {
      return res.status(500).send("Token generation failed");
    }

    return res.status(200).send(`Token generated successfully: ${token}`);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
};
