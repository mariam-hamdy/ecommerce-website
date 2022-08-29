const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true,'please provide the email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide the password'],
        minlength: 4
    },
    phone: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    street: {
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
    isAdmin: {
        type: Boolean,
        default: false
    }
})


UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function(enteredPassword) {
    const isSame = await bcrypt.compare(enteredPassword, this.password)
    return isSame
}

UserSchema.methods.generateToken = function() {
    const token = jwt.sign({userId: this._id, username: this.name, isAdmin: this.isAdmin}, 
        process.env.JWT_SECRET,{expiresIn: process.env.TOKEN_TIME})
    return token
}




module.exports = mongoose.model('User', UserSchema)