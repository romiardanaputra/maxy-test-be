import express from "express";

import posts from "./routes/posts.js";
import connectDB from "./config/database.js";

// @desc controller import
import register from "./routes/register.js";
import login from "./routes/login.js";

const app = express();
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB(); // Connect to the database
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();

app.use(express.json()); //parse json body

app.use("/api/posts", posts);

app.use("/api/register", register);

app.use("/api/login", login);

export default app;
