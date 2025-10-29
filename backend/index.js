import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import blogs from "./routes/BlogsRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
connectDB(); // function call
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://blogss-ruddy.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Blogs API");
});
app.use("/api/v1/blogs", blogs); //what is blog in this expain?

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
