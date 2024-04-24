const express = require("express");
const reviewControllers = require("../controllers/reviewsController.js");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(reviewControllers.getAllReview)
  .post(reviewControllers.addReview);

reviewRouter.route("/:id").delete(reviewControllers.deleteReview);
reviewRouter.route("/:id").put(reviewControllers.updateReview);

module.exports = reviewRouter;
