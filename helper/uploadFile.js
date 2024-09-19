const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const extension = path.extname(file.originalname);
  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = { fileSize: 1024 * 1024 * 5 }; //5 MB

const upload = multer({ storage, fileFilter, limits });

const deleteFile = async (filename) => {
  try {
    if (filename) {
      await fs.unlink("uploads" + "/" + `${filename}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { upload, deleteFile };
