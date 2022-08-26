import express from "express"
import { addImage, getAllImages, removeImage } from "../controllers/imageController.js";

const router = express.Router();

router.get("/:id", getAllImages)
router.delete("/:id", removeImage)
router.post("/upload/:id", addImage)

export default router;
