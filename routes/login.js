import express from "express";
import login from "../controller/loginController";
const router = express.Router();

router.post("/", login);

export default router;
