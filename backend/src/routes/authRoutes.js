const express = require("express");
const {registerUser, loginUser, getUserProfile} = require("../controllers/authController");
const validation = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware")
const uploadImage = require("../controllers/uploadController")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", validation, getUserProfile);
router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;
