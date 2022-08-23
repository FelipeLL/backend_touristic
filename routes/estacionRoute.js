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
// router.post("/image/:id", addImage)
// router.get("/image/:id", getImage)
// router.delete("/image/:id", deleteImage)


export default router;
