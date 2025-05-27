
console.log('uploadRouter loaded');

const express = require('express');
const { uploaddoc, getdoc, listFiles } = require('../Controllers/FileController');
const uploaddocument = require('../Middlewares/uploadMiddleware');
const { authenticateUser } = require('../Middlewares/AuthMiddleware');

const router = express.Router(); // ✅ Use `router`, not `documentRouter`

// Test route to verify router is working
router.get('/test', (req, res) => {
  console.log('uploadRouter test route hit');
  res.status(200).json({ message: 'uploadRouter test route is working' });
});

// Route to upload a file
router.post('/upload', authenticateUser, uploaddocument.single('file'), uploaddoc);

// Route to get/stream a file by filename
router.get('/file/:filename', getdoc); // ✅ filename should be in params, no middleware needed here

// Debug route to list all files stored in GridFS
router.get('/files', listFiles);

module.exports = router;
