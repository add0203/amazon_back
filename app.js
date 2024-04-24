const express = require("express");
const productsRouter = require("./routes/productsRoutes.js");
const reviewsRouter = require("./routes/reviewsRoutes.js");
const app = express();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);

module.exports = app;
