import express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController";

import {
  validatePostProduct,
  validateGetByIdPutAndDeleteProduct,
} from "../helpers/general-validators";

const router = express.Router();

router.get("/", getProduct);
router.get("/:id", validateGetByIdPutAndDeleteProduct, getProductById);
router.post("/", validatePostProduct, createProduct);
router.put("/:id", validateGetByIdPutAndDeleteProduct, updateProduct);
router.delete("/:id", validateGetByIdPutAndDeleteProduct, deleteProduct);

export default router;
