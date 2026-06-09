const multer = require('multer');

const storage = multer.memoryStorage(); // store file as Buffer in req.file.buffer

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') { // MIME 
    cb(null, true); // no error and accept the file
  } else {
    // cb(error) means reject and pass the error downstream
    cb(Object.assign(new Error('Only PDF files are allowed'), { status: 400 })); // staple a status property onto Error object so global error handler can read it and send the right HTTP status code
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 1024 * 1024 = 1 MB so this caps uploads at 10 MB
});

module.exports = upload;