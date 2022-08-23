const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: [true, 'please provide at least one order item']
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide the user']
    },
    phone: {
        type: String,
        default: ''
    },
    shippingAddress: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    totalPrice: {
        type: Number,
        required: [true, 'please provide the total price']
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Order', OrderSchema)