const express = require("express");
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const Task = require("../models/Task"); // Import Task model

const router = express.Router();

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /csv|xlsx|xls/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extName) {
            return cb(null, true);
        } else {
            return cb(new Error("Only CSV, XLSX, and XLS files are allowed!"));
        }
    },
});

// ✅ Upload and Process File Route
router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = req.file.path;

    try {
        // ✅ Read the uploaded file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // ✅ Insert data into MongoDB
        if (sheetData.length > 0) {
            await Task.insertMany(sheetData);
            res.json({ msg: "File uploaded and data stored successfully!" });
        } else {
            res.status(400).json({ msg: "No valid data found in file!" });
        }

        // ✅ Delete file after processing
        fs.unlinkSync(filePath);

    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ msg: "Server error, file processing failed!" });
    }
});

module.exports = router;
