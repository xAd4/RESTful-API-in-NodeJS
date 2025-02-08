import express from "express";
import {
  updateImage,
  uploads,
  showImage,
} from "../controllers/UploadController";

const router = express.Router();

router.get("/:collection/:id", showImage);
router.post("/", uploads);
router.put("/:collection/:id", updateImage);

export default router;
