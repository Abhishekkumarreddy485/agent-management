const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage, fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("csv") && !file.mimetype.includes("excel")) {
        return cb(new Error("Only CSV or Excel files are allowed!"), false);
    }
    cb(null, true);
}});

module.exports = upload;
