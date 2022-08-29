const express = require('express')
const router = express.Router()
const {
    getAllOrders,
    getOneOrder,
    addNewOrder,
    updateOneOrder,
    deleteOneOrder
} = require('../controllers/order-controller')


router.route('/').get(getAllOrders).post(addNewOrder)
router.route('/:id').get(getOneOrder).patch(updateOneOrder).delete(deleteOneOrder)


module.exports = router