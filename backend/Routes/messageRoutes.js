const express = require('express')
const { protect } = require('../Middleware/authMiddleware.js');
const { sendMessage, allMessages } = require('../Controllers/messageController.js');

const router = express.Router()

router.route('/').post(protect, sendMessage)
router.route("/:chatId").get(protect, allMessages);


module.exports = router;