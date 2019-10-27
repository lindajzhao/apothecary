const multer = require("multer");

// save to /uploads with original file name
const storageStrategy = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// only allow < 5mb
const limits = { fileSize: 1024 * 1024 * 5 };

// only allow jpeg and png
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    return cb(null, true);
  }
  cb(new Error("Image must be jpeg or png format"), false);
};

module.exports = multer({ storage: storageStrategy, limits, fileFilter });
