const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generates jwt token
function generateToken(userId) {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// Registers a new user
async function registerUser(req, res) {
    try {
        const {name, email, password, profileImageUrl} = req.body; 
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        // Create new user
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// responsible for logging in users
async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        
        // Checks if user exists with the given email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(500).json({message: "Invalid email or password"});
        }


        // Checks if the entered password matches the password associated with the user email
        const doesMatch = await bcrypt.compare(password, user.password);
        if (!doesMatch) {
            return res.status(500).json({message: "Invalid email or password"});
        }

        res.json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User could not be found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {registerUser, loginUser, getUserProfile}