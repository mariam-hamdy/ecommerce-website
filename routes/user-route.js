const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getOneUser,
    addNewUser,
    updateOneUser,
    deleteOneUser
} = require('../controllers/user-controller')



router.route('/').get(getAllUsers).post(addNewUser)

router.route('/:id').get(getOneUser).patch(updateOneUser).delete(deleteOneUser)

module.exports = router