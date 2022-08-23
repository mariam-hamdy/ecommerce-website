const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'please provide the product']
    }
})

module.exports = mongoose.model('OrderItem', OrderItemSchema)