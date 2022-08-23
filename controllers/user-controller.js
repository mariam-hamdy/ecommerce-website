const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticat')
const NotFoundError = require('../errors/not-found')
const User = require('../models/user')


//for admin
const getAllUsers = async (req,res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({success: true, users, count: users.length})
}

//for admin
const getOneUser = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if(!user) {
        throw new NotFoundError('the provided userId not found')
    }
    res.status(StatusCodes.OK).json({success:true, user})
    
}

//for admin and user
const addNewUser = async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('please provide email or password')
    }
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({success: true, user})
}


//for admin and user
const updateOneUser = async (req,res) => {
    const id = req.params.id
    const user = await User.findByIdAndUpdate({_id: id}, {...req.body}, {
        new: true,
        runValidators:true
    })
    if(!user) {
        throw new NotFoundError('the provided userId not found')
    }
    res.status(StatusCodes.OK).json({success: true, user})
}

//for admin
const deleteOneUser = async (req,res) => {
    const id = req.params.id
    const user = await User.findByIdAndDelete({_id: id})
    if(!user) {
        throw new NotFoundError('the provided userId not found')
    }
    res.status(StatusCodes.OK).json({success: true})
}



module.exports = {
    getAllUsers,
    getOneUser,
    addNewUser,
    updateOneUser,
    deleteOneUser
}