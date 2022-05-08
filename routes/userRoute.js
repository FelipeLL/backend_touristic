import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  confirmAccount
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
//router.get("/confirm/:token", confirmAccount)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
