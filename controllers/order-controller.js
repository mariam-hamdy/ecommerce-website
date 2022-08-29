const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')



const getAllOrders = async(req, res) => {
    res.send('get all categories')
}

const getOneOrder = async(req, res) => {
    res.send('get one category')
}

const addNewOrder = async(req, res) => {
    res.send('add new category')
}

const updateOneOrder = async(req, res) => {
    res.send('update one category')
}

const deleteOneOrder = async(req,res) => {
    res.send('delete one category')
}

module.exports = {
    getAllOrders,
    getOneOrder,
    addNewOrder,
    updateOneOrder,
    deleteOneOrder
}