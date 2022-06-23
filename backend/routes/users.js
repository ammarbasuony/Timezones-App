import { Router } from "express";
const router = Router();

// Import Controllers
import { index, addUser } from "../controllers/userController.js";

router.get("/", index);
router.post("/signup", addUser);
router.post("/", addUser);

export default router;