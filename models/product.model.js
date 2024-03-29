const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: String, required: true, default: "0" },
    description: { type: String },
    imageUrl: { type: String, default: "" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    status: { type: Number, required: true, default: 1 },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
