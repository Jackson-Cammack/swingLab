import express from "express";

import {
  createGolfer,
  deleteGolfer,
  getGolferById,
  getGolfers,
  updateGolfer,
} from "../controllers/golferController.js";

const router = express.Router();

router.route("/").get(getGolfers).post(createGolfer);

router
    .route("/:id")
    .get(getGolferById)
    .put(updateGolfer)
    .delete(deleteGolfer);

export default router;