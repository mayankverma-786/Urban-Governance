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
      console.log(`Rejected file type: ${file.mimetype}`);
      return null; // Skip file upload if MIME type doesn't match
    }

    const filename = `${Date.now()}-urban-${file.originalname}`;
    console.log(`Storing file: ${filename}`);
    return {
      bucketName: 'uploads',
      filename,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;  // Ensure you're exporting the `upload` middleware
