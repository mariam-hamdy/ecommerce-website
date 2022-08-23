const express = require('express')
const router = express.Router()
const {
    getAllCategories,
    getOneCategory,
    addNewCategory,
    updateOneCategory,
    deleteOneCategory
} = require('../controllers/category-controller')


router.route('/').get(getAllCategories).post(addNewCategory)
router.route('/:id').get(getOneCategory).patch(updateOneCategory).delete(deleteOneCategory)


module.exports = router