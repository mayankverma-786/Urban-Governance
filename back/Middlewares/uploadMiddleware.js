// Middlewares/uploadMiddleware.js

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const url = process.env.MONGO_CONN;

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg', 'video/mp4'];

    if (!match.includes(file.mimetype)) {
      return null; // Skip file upload if MIME type doesn't match
    }

    return {
      bucketName: 'uploads',
      filename: `${Date.now()}-urban-${file.originalname}`,
    };
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;  // Ensure you're exporting the `upload` middleware
