const express = require('express');
const { createIssue, getIssues } = require('../Controllers/IssueController');
const { authenticateUser } = require('../Middlewares/AuthMiddleware');
const upload = require('../Middlewares/uploadMiddleware'); // Corrected import
const router = express.Router();

// Route to create an issue
router.post('/create', authenticateUser, upload.single('image'), createIssue); 

// Route to fetch issues
router.get('/get-issue', authenticateUser, getIssues);

module.exports = router;
