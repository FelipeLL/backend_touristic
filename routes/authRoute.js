import express from "express";
import { loginUser, readToken, logout } from "../controllers/authController.js"
const router = express.Router();

router.post("/", loginUser);
router.get("/", readToken);
router.get("/logout", logout);

export default router