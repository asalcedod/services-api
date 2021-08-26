const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        description: { type: String },
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
    { timestamps: true },
)

module.exports = mongoose.model('Category', Category)