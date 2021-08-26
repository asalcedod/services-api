const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rol = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        level: { type: Number, required: true, default: 1},
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

module.exports = mongoose.model('Rol', Rol)