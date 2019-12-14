const mongoose = require('mongoose')

const transactionDetailSchema = new mongoose.Schema(
    {
        subTotal: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)
  
const transactionDetail = mongoose.model('transactionDetail', transactionDetailSchema)
  
module.exports = transactionDetail