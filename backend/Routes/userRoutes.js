const express = require('express')
const { registerUser, loginUser, Allusers } = require('../Controllers/userControllers.js')
const { protect } = require('../Middleware/authMiddleware.js')

const router = express.Router()

router.route('/allUsers').get(protect, Allusers)
router.route('/register').post(registerUser)
router.post('/login',loginUser)




module.exports = router