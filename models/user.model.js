const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        identification: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        imageUrl: { type: String, default: "" },
        password: { type: String, required: true },
        status: { type: Number, required: true, default: 1 },
        rol: {type: mongoose.Schema.Types.ObjectId, ref: 'Rol'}
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

User.methods.setImageUrl = function(filename) {
    this.imageUrl = `${filename}`
}

module.exports = mongoose.model('User', User)