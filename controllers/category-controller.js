const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const Category = require('../models/category')


//all of them for admin
const getAllCategories = async(req, res) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json({categories, count: categories.length})
}

const getOneCategory = async(req, res) => {
    const id = req.params.id
    const category = await Category.findById(id)
    if(!category) {
        throw new NotFoundError('the provided categoryId not found')
    }
    res.status(StatusCodes.OK).json({success:true, category})
}

const addNewCategory = async(req, res) => {
    const name = req.body.name
    if(!name) {
        throw new BadRequestError('please provide the category name')
    }
    const category = await Category.create({...req.body})
    res.status(StatusCodes.CREATED).json({success: true, category})
}



const updateOneCategory = async(req, res) => {
    const id = req.params.id
    const category = await Category.findByIdAndUpdate({_id: id}, {...req.body}, {
        new: true,
        runValidators:true
    })
    if(!category) {
        throw new NotFoundError('the provided categoryId not found')
    }
    res.status(StatusCodes.OK).json({success: true, user})
}

const deleteOneCategory = async(req,res) => {
    const id = req.params.id
    const category = await Category.findByIdAndDelete({_id: id})
    if(!category) {
        throw new NotFoundError('the provided categoryId not found')
    }
    res.status(StatusCodes.OK).json({success: true})
}

module.exports = {
    getAllCategories,
    getOneCategory,
    addNewCategory,
    updateOneCategory,
    deleteOneCategory
}