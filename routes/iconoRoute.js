import express from "express";
import {
    getAllIconos,
} from "../controllers/iconoController.js";

const router = express.Router();

router.get("/", getAllIconos);




export default router;