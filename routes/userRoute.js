import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,

} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUsers);
// router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
