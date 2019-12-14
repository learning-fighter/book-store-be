const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        qty: {
            type: Number,
            required: true,
            trim: true,
        },
        priceTotal: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)
  
const transaction = mongoose.model('transaction', transactionSchema)
  
module.exports = transaction