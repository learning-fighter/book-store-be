const mongoose = require('mongoose')

const cartDetailSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        subTotal: {
            type: Number,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

const cartDetail = mongoose.model('CartDetail', cartDetailSchema)
  
module.exports = cartDetail