import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  updatePassword

} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUsers);
router.get("/getOne/:id", getUser);
router.put("/:id", updateUser);
router.put("/password/:id", updatePassword);
router.delete("/:id", deleteUser);

export default router;
