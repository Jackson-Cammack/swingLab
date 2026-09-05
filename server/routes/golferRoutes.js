import { Router } from "express";
import {
  getGolfers,
  createGolfer,
  getGolferById,
  updateGolfer,
  deleteGolfer,
} from "../controllers/golferController.js";

const router = Router();

router.get("/", getGolfers);
router.post("/", createGolfer);
router.get("/:id", getGolferById);
router.put("/:id", updateGolfer);
router.delete("/:id", deleteGolfer);

export default router;
