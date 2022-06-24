import { Router } from "express";
const router = Router();

// Import Controllers
import {
  index,
  addUser,
  getById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.get("/", index);
router.post("/", addUser);
router.get("/:id", getById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
