const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the category name']
    },
    icon: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    }
})


module.exports = mongoose.model('Category', CategorySchema)