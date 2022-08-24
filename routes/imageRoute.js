import express from "express"
import { addImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload/:id", addImage)

export default router;
