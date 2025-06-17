const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, photo-${Date.now()}${ext});
  },
});

const upload = multer({ delt:'upload/' });

app.use(express.static("uploads")); // Serves uploaded images

app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  const fileUrl = ${req.protocol}://${req.get("host")}/${req.file.filename};
  res.send(File uploaded: <a href="${fileUrl}">${fileUrl}</a>);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
