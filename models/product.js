const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the product name']
    },
    description: {
        type: String,
        required: [true, 'please provide a short description'],
        maxlength: 30,
        minlength: 5
    },
    richDescription: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: [true, 'please provide the product price']
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
        default: ''
    }],
    brand: {
        type: String,
        required: [true, 'please provide the product brand']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'please provide the product category']
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        required: [true, 'please provide the count in stock'],
        min: 0,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        default:0
    }
})

module.exports = mongoose.model('Product', ProductSchema)