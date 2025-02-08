import express from "express";
import {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController";

import {
  validateGetByIdCategory,
  validatePostCategory,
  validatePutAndDeleteCategory,
} from "../helpers/general-validators";

const router = express.Router();

router.get("/", getCategory);
router.get("/:id", validateGetByIdCategory, getCategoryById);
router.post("/", validatePostCategory, createCategory);
router.put("/:id", validatePutAndDeleteCategory, updateCategory);
router.delete("/:id", validatePutAndDeleteCategory, deleteCategory);

export default router;
