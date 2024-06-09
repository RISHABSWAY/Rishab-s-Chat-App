const express = require('express')
const { getAllUsers, getAllUsersChat, getAllUsersMessages } = require('../Controllers/adminControllers.js')
const { protect } = require('../Middleware/authMiddleware.js')
const { adminMiddleware } = require('../Middleware/adminMiddleware.js')

const router = express.Router()

router.route('/users').get(protect,adminMiddleware, getAllUsers)
router.route('/users/chat').get(protect,adminMiddleware, getAllUsersChat)
router.route('/users/messages').get(protect,adminMiddleware, getAllUsersMessages)

module.exports = router