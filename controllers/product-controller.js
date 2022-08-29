const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const Product = require('../models/product')
const Category = require('../models/category')

//products for public but add, delete, update for the admin
const getAllProducts = async(req, res) => {
    //filteration is missing
    const products = await Product.find({}).populate('category')
    res.status(StatusCodes.OK).json({products, count: products.length})
}

const getOneproduct = async(req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(!product) {
        throw new NotFoundError('the provided productId not found') 
    }
    res.status(StatusCodes.OK).json({sucess:true ,product})

}

const addNewProduct = async(req, res) => {
    const {name, description, price, brand, count} = req.body
    const categoryId = req.body.category
    if(!name || !description || !price || !brand || !count) {
        throw new BadRequestError('please enter the data')
    }
    const category = await Category.findById(categoryId)
    if(!category) {
        throw new NotFoundError('the provided categoryId not found')
    }
    const product = await Product.create({...req.body})
    res.status(StatusCodes.CREATED).json({sucess: true, product})
}

const updateOneProduct = async(req, res) => {
    const productId = req.params.id
    const categoryId = req.body.category
    const category = await Category.findById(categoryId)
    if(!category) {
        throw new NotFoundError('the provided categoryId not found')
    }
    const product = await Product.findByIdAndUpdate({_id: productId, category: categoryId}, 
        {...req.body}, {
        new: true,
        runValidators:true
    })
    if(!product) {
        throw new NotFoundError('the provided productId not found')
    }
    res.status(StatusCodes.OK).json({success: true, product})
}

const deleteOneProduct = async(req,res) => {
    const productId = req.params.id
    const product = await Product.findByIdAndDelete({_id: productId})
    if(!product) {
        throw new NotFoundError('the provided productId not found')
    }
    res.status(StatusCodes.OK).json({success: true})
}

module.exports = {
    getAllProducts,
    getOneproduct,
    addNewProduct,
    updateOneProduct,
    deleteOneProduct
}