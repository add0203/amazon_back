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
