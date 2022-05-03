import express from "express";
import { login, readToken, recoverAccount } from "../controllers/authController.js"
const router = express.Router();

router.post("/", login);
router.get("/", readToken);
router.post("/recover", recoverAccount)
export default router