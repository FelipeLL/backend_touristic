import express from "express";
import {
    getAllEstaciones
} from "../controllers/estacionController.js";

const router = express.Router();

router.get("/", getAllEstaciones);

export default router;
