import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"
dotenv.config();

const app = express();

app.use(cors({origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], }));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));