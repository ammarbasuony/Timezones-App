import { Router } from "express";
const router = Router();

import {
  index,
  getById,
  createTimezone,
  updateTimezone,
  deleteTimezone,
} from "../controllers/timezonesController.js";

router.get("/", index);
router.get("/:id", getById);
router.post("/", createTimezone);
router.put("/:id", updateTimezone);
router.delete("/:id", deleteTimezone);

export default router;
