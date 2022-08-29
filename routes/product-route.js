const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    getOneproduct,
    addNewProduct,
    updateOneProduct,
    deleteOneProduct
} = require('../controllers/product-controller')

router.route('/').get(getAllProducts).post(addNewProduct)
router.route('/:id').get(getOneproduct).patch(updateOneProduct).delete(deleteOneProduct)

module.exports = router