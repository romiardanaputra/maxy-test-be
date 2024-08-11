import express from "express";
import { registerUser } from "../controller/registerController.js";
const router = express.Router();

// @desc register's route
router.post("/", registerUser);

export default router;
