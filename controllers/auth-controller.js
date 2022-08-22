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
        throw new BadRequestError('no data entered')
    }
   const user = await User.create({...req.body})
   const token = user.generateToken()

   res.status(StatusCodes.CREATED).json({username: user.name, token})

}

const login = async(req,res) => {
    res.send('user logged in')
}

module.exports = {
    register,
    login
}