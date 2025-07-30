const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function validation(req, res, next) {
    try {
        let token = req.headers.authorization ;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findbyID(decodedToken.id).select("-password");
            next();
        } else {
            res.status(401).json({message: "Not authorized, token is invalid"})
        }
    } catch (error) {
        res.status(401).json({message: "Token failed due to the following error:", error: error.message})
    }
};

module.exports = validation 