const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
      //   unique: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const reviewsModel = mongoose.model("reviews", reviewsSchema);

// const testModel = new reviewsModel({
//   userId: "12345678903",
//   reviewTitle: "good product",
//   productId: "6621f6cbd77527e05e106afd",
//   description: "lorem 100",
//   rating: 4,
// });

// testModel.save().then((res) => {
//   console.log(res);
// });

module.exports = reviewsModel;
