const reviewsModel = require("../models/reviewModel");
const productsModel = require("../models/productsModel");

const getAllReview = async (req, res) => {
  const reviews = await reviewsModel.find();
  console.log(reviews);
  res.send(reviews);
};

const addReview = async (req, res) => {
  const { productId } = req.body;
  const reqData = req.body;

  const product = await productsModel.findOne({ _id: productId });
  if (!product) {
    res.send("product notFound");
  }

  const reviews = await reviewsModel.create(reqData);

  const productUpdated = await productsModel.findOneAndUpdate(
    { _id: productId },
    {
      $push: { reviews: reviews._id },
    }
  );
  if (!reviews) {
    res.send("product notFound");
  }

  res.send(reviews);
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Delete the review
    const deletedReview = await reviewsModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const updatedProduct = await productsModel.findByIdAndUpdate(
      deletedReview.productId,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    res.json({ message: "Review deleted successfully", deletedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updateData = req.body;

    // Update the review
    const updatedReview = await reviewsModel.findByIdAndUpdate(
      reviewId,
      updateData,
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllReview,
  addReview,
  updateReview,
  deleteReview,
};
