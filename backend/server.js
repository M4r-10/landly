require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./src/routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

app.use(cors({origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], }));

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes)

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));