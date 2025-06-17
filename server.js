const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.static('uploads')); // Serve uploaded files statically

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = photo-${Date.now()}${ext};
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = ${req.protocol}://${req.get('host')}/${req.file.filename};
  res.json({ message: 'File uploaded', fileUrl });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
