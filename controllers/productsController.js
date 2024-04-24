const productModel = require("../models/productsModel.js");

const getAllProducts = async (req, res) => {
  //   const q = req.query;

  const {
    sort = "price",
    page = 1,
    pageSize = 3,
    selectItem = "-info",
    ...q
  } = req.query;
  const selectItems = selectItem.split(",").join(" ");
  console.log(selectItems);
  const sortStr = sort.split(",").join(" ");
  console.log(sortStr);

  //   const skip = 1; //define 3 pages number set at page 1
  //   const limit = 3;

  //   const products = await productModel.find(q).sort([["price", 1]]);
  let query = productModel.find(q);
  // .find({ price: { $gt: 600 } })
  // .sort("-price title");
  // .sort([["title", 1]]);
  query = query
    .sort(sortStr)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .select(selectItems);

  const products = await query;
  const totalResults = await productModel.countDocuments();
  console.log(req.url);
  res.json({
    status: "success",
    results: products.length,
    totalResult: totalResults,
    page: page,
    pageSize: pageSize,
    data: {
      products,
    },
  });
};

const addProduct = async (req, res) => {
  try {
    const { _id, createdAt, updatedAt, ...reqData } = req.body;
    const products = await productModel.create(reqData);
    res.json({
      status: "success",
      results: 1,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(403);
    console.log(err);
    res.json({
      status: "fail",
      message: JSON.stringify(err),
    });
  }
};

const replaceProduct = async (req, res) => {
  try {
    const reqId = req.params.id;
    const { _id, createdAt, updatedAt, ...data } = req.body;
    const products = await productModel.findOneAndReplace({ _id: reqId }, data);
    if (!products) {
      res.status(400);
      res.json({
        status: "fail",
        message: "Id does not exist",
      });
      return;
    }
    res.json({
      status: "success",
      results: 1,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: "fail",
      message: JSON.stringify(err),
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const reqId = req.params.id;
    const { _id, createdAt, updatedAt, ...data } = req.body;
    const products = await productModel.findOneAndUpdate({ _id: reqId }, data);
    if (!products) {
      res.status(400);
      res.json({
        status: "fail",
        message: "Id does not exist",
      });
      return;
    }
    res.json({
      status: "success",
      results: 1,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: "fail",
      message: JSON.stringify(err),
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const reqId = req.params.id;
    const products = await productModel.findOneAndDelete({ _id: reqId });
    if (!products) {
      res.status(400);
      res.json({
        status: "fail",
        message: "Id does not exist",
      });
      return;
    }
    res.status(204);
    res.json({
      status: "success",
      results: 1,
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: "fail",
      message: JSON.stringify(err),
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
