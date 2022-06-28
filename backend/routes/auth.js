import { Router } from "express";
const router = Router();

// Import Controllers
import { signup, login, getIdfromToken } from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/get-user", getIdfromToken);

export default router;
