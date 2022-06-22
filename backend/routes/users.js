import { Router } from "express";
const router = Router();

// Import Controllers
import { addUser } from "../controllers/userController";

router.post("/", addUser);

export default router;
