import express from "express";
import { login, readToken } from "../controllers/authController.js"
const router = express.Router();

router.post("/", login);
router.get("/", readToken);
export default router