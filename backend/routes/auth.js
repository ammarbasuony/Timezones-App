import { Router } from "express";
const router = Router();

// Import Controllers
import { signup, login } from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);

export default router;
