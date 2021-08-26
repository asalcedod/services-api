const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Submit = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        status: { type: Number, required: true, default: 1 },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    },
)

module.exports = mongoose.model('Submit', Submit)