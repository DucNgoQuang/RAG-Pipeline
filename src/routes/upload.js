const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractText } = require('../services/pdfParser');

router.post('/upload', upload.single('file'), async (req, res, next) => { // single('file') means expect one file, under the form-data field named file
  if (!req.file) { // after Multer runs, it attaches result to req.file
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const text = await extractText(req.file.buffer);
    res.status(200).json({
      filename: req.file.originalname,
      size: req.file.size,
      preview: text.slice(0, 300), // first 300 chars so Postman stays readable
      totalLength: text.length
    });
  } catch (err) {
    next(err); // pass to global error handler in app.js
  }
});

module.exports = router;