import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve() + "/backend/uploads");
  },
  filename: function (req, file, cb) {
    let origName = file.originalname;
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + origName.split(".")[0]
    );
  },
});

const upload = multer({ storage: storage });
export default upload;
