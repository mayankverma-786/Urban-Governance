const express = require('express');
const { uploaddoc, getdoc } = require('../Controllers/FileController');
const uploaddocument = require('../Middlewares/uploadMiddleware');
const { authenticateUser } = require('../Middlewares/AuthMiddleware');

const router = express.Router(); // ✅ Use `router`, not `documentRouter`

// Route to upload a file
router.post('/upload', authenticateUser, uploaddocument.single('file'), uploaddoc);

// Route to get/stream a file by filename
router.get('/file/:filename', authenticateUser, getdoc); // ✅ filename should be in params, no middleware needed here

module.exports = router;
