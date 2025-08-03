const multer = require("multer");

// creates storage for images 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// filters files and ensures they are of the correct type
function fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only use .jpeg, .jpg, and .png formats'), false);
    }
};

const upload = multer({storage, fileFilter})

module.exports = upload;

