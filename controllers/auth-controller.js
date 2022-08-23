const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticat')
const User = require('../models/user')

const register = async(req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('please enter the data')
    }
   const user = await User.create({...req.body})
   const token = user.generateToken()

   res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})

}

const login = async(req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide email or password')
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('The provided email or password not found')
    }
    const isSame = await user.comparePassword(password)
    if(!isSame) {
        throw new UnauthenticatedError('The provided email or password not found')
    }
    const token = user.generateToken()

    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}

module.exports = {
    register,
    login
}