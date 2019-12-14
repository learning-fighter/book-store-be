const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        pages: {
            type: String,
            required: true,
            trim: true,
        },
        stock: {
            type: Number,
            required: true,
            trim: true,
        },
        synopsis: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)
  
const cart = mongoose.model('Cart', cartSchema)
  
module.exports = cart