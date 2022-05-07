import express from "express";
import { login, readToken, recoverAccount, logout } from "../controllers/authController.js"
const router = express.Router();

router.post("/", login);
router.get("/", readToken);
router.get("/logout", logout);
router.post("/recover", recoverAccount)

export default router