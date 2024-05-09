import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().replace(/:/g, "-");
    const fileName = currentDate + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

export { upload };
