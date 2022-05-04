import express from "express";
import {
    getAllEstaciones,
    createEstacion,
    deleteEstacion,
    updateEstacion,
    addImage
} from "../controllers/estacionController.js";

const router = express.Router();

import multer from "multer"
import { fileURLToPath } from 'url';
import path, { dirname } from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname),
    filename: (req, file, cb) => {
        cb(null, Date.now() + " " + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).single('image')


router.get("/", getAllEstaciones);
router.post("/", createEstacion);
router.delete("/:id", deleteEstacion);
router.put("/:id", updateEstacion);
// router.post("/image", fileUpload, addImage)

export default router;
