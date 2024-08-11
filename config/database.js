// @desc database setup configuration

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("Database is connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
