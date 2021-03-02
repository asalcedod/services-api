const Product = require("../models/product.model");

createProduct = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a product",
    });
  }

  const product = new Product(body);

  if (!product) {
    return res.status(203).json({ success: false, error: err });
  }

  product
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: product._id,
        message: "Product created!",
      });
    })
    .catch((error) => {
      return res.status(203).json({
        error,
        message: "Product not created!",
      });
    });
};

updateProduct = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(203).json({
        err,
        message: "Product not found!",
      });
    }

    product.name = body.name;
    product.code = body.code;
    product.price = body.price;
    product.description = body.description;
    product.imageUrl = body.imageUrl;
    product.categories = body.categories;
    product.status = body.status;
    product
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: product._id,
          message: "Product updated!",
        });
      })
      .catch((error) => {
        return res.status(203).json({
          error,
          message: "Product not updated!",
        });
      });
  }).populate("category");
};

deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!product) {
      return res
        .status(203)
        .json({ success: false, error: `Product not found` });
    }

    return res.status(200).json({ success: true, data: product });
  })
    .populate("category")
    .catch((err) => console.log(err));
};

getProductById = async (req, res) => {
  await Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!product) {
      return res
        .status(203)
        .json({ success: false, error: `Product not found` });
    }
    return res.status(200).json({ success: true, data: product });
  })
    .populate("category")
    .catch((err) => console.log(err));
};

getProducts = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Product.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Product.find({}, (err, products) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!products.length) {
      return res
        .status(203)
        .json({ success: false, error: `Product not found!` });
    }
    return res.status(200).json({ success: true, data: products, totalpages });
  })
    .limit(limit)
    .skip(page * limit)
    .populate("category")
    .catch((err) => console.log(err));
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
