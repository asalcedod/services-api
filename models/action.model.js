const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Action = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Number, required: true, default: 1 },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    },
)

module.exports = mongoose.model('Action', Action)