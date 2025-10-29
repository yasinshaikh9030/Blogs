import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load environment variables

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed:", err);
      process.exit(1);
    });
};

export default connectDB;
