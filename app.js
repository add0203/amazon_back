const express = require("express");
const productsRouter = require("./routes/productsRoutes.js");
const reviewsRouter = require("./routes/reviewsRoutes.js");
const userRouter = require("./routes/usersRoutes.js");
const staticRoute = require("./routes/staticRoute.js");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.get("/test", async (req, res) => {
  return res.render("signUp");
});

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", userRouter);
app.use("/", staticRoute);

module.exports = app;
