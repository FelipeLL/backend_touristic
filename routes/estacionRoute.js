import express from "express";
import {
    getAllEstaciones,
    createEstacion,
    deleteEstacion,
    updateEstacion
} from "../controllers/estacionController.js";

const router = express.Router();

router.get("/", getAllEstaciones);
router.post("/", createEstacion);
router.delete("/:id", deleteEstacion);
router.put("/:id", updateEstacion);

export default router;
