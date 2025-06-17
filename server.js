const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
  console.log('Image uploaded:', req.file);
  res.json({ message: 'Image uploaded successfully', file: req.file });
});

app.listen(port, () => {
  console.log(Server running on port ${port});
});
