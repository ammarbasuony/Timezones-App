import { Router } from "express";
const router = Router();

// Import Controllers
import { index } from "../controllers/homeController.js";

router.get("/", index);

export default router;
