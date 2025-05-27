const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

let gfs;

const conn = mongoose.connection;

// Initialize GridFS once DB is connected
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // your GridFS bucket
});

// Upload a file (Multer handles the storage)
const uploaddoc = async (req, res) => {
  try {
    if (!req.file) {
      console.error('Upload error: No file uploaded');
      return res.status(400).json({ message: 'No file uploaded. Please select a file.' });
    }

    console.log(`File uploaded successfully: ${req.file.filename}, size: ${req.file.size} bytes`);

    return res.status(200).json({
      message: 'Your file was uploaded successfully!',
      file: req.file,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'An error occurred while uploading the file.' });
  }
};

// Get and stream a file by filename
const getdoc = async (req, res) => {
  try {
    if (!gfs) {
      console.error('Fetch error: File system not initialized yet');
      return res.status(500).json({ message: 'File system not initialized yet.' });
    }

    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      console.error(`Fetch error: File not found - ${req.params.filename}`);
      return res.status(404).json({ message: 'File not found.' });
    }

    console.log(`Streaming file: ${file.filename}, size: ${file.length} bytes`);

    res.set('Content-Type', file.contentType); // Set correct content type
    const readStream = gfs.createReadStream({ filename: file.filename });
    readStream.pipe(res);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ message: 'An error occurred while retrieving the file.' });
  }
};

const listFiles = async (req, res) => {
  try {
    console.log('listFiles called');
    if (!gfs) {
      console.error('List files error: File system not initialized yet');
      return res.status(500).json({ message: 'File system not initialized yet.' });
    }

    const files = await gfs.files.find().toArray();
    console.log(`Found ${files.length} files in GridFS`);

    if (!files || files.length === 0) {
      console.log('No files found in GridFS');
      return res.status(404).json({ message: 'No files found.' });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error('List files error:', error);
    return res.status(500).json({ message: 'An error occurred while listing the files.' });
  }
};

module.exports = { uploaddoc, getdoc, listFiles };
