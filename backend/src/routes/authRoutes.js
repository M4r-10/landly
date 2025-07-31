const express = require("express") 
const {registerUser, loginUser, getUserProfile} = require("../controllers/authController")
const validation = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", validation, getUserProfile)







module.exports = router 
