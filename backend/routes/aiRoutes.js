const express = require('express');
const router = express.Router();
const { askHealthAssistant, getHistory, getRecordById } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/ask', protect, askHealthAssistant);
router.get('/history', protect, getHistory);
router.get('/history/:id', protect, getRecordById);

module.exports = router;
