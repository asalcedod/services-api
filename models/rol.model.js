const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rol = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Number, required: true, default: 1 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Rol', Rol)