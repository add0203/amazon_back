require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");
const dbDataUpload = require("./configs/db_data.js");

// const test = require("./models/reviewModel.js");

const URL =
  "mongodb+srv://$_USERNAME_$:$_PASSWORD_$@clustor0.pc5ijeq.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=clustor0";

const dbUsername = "addbd";
const dbPass = "GB8ZFjmmwkqYSiaZ";
const dbName = "Amazon-Backend";

let dbLink = URL.replace("$_USERNAME_$", dbUsername);
dbLink = dbLink.replace("$_PASSWORD_$", dbPass);
dbLink = dbLink.replace("$_DB_NAME_$", dbName);

console.log(process.env.car);

mongoose.connect(dbLink).then(() => {
  console.log("-------- Database Connected --------");
  // dbDataUpload();
});

app.listen(5001, () => {
  console.log("----------- App Started -----------");
});
