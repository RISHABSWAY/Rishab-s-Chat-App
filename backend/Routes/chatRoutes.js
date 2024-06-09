const express = require('express');
const { accessChat, fetchChats, createGC, renameGC, removeFromGC, addToGC } = require('../Controllers/chatControllers');
const { protect } = require('../Middleware/authMiddleware.js');

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGC);
router.route("/gcrename").put(protect, renameGC);
router.route("/gcRemove").put(protect, removeFromGC);
router.route("/gcAdd").put(protect, addToGC);


module.exports = router;