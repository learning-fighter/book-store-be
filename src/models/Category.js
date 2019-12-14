const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
    
)
  
// categorySchema.virtual('books', {
//     ref: 'Book',
//     localField: '_id',
//     foreignField: 'categoryId',
// })

const category = mongoose.model('Category', categorySchema)
  
module.exports = category