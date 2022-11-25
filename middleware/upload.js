const multer = require('multer');
const fs = require('fs');

// Set global directory
global.__basedir = __dirname;

// Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = __basedir + '/uploads/';
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

// Filter for CSV file
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("image")) {
        console.log("file.mimetype",file.mimetype)
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};
const upload = multer({ storage: storage, fileFilter: csvFilter, limits: { fileSize: 800000 } });
module.exports = upload;