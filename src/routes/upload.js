const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), (req, res) => { // single('file') means expect one file, under the form-data field named file
  if (!req.file) { // after Multer runs, it attaches result to req.file
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File received successfully',
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

module.exports = router;