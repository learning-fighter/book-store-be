const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        total: {
            type: Number,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

const cart = mongoose.model('Cart', cartSchema)
  
module.exports = cart