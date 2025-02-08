import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/UserController";

import {
  validatePostUser,
  validatePutAndDeleteUser,
} from "../helpers/general-validators";

const router = express.Router();

router.get("/", getUsers);
router.post("/", validatePostUser, createUser);
router.put("/:id", validatePutAndDeleteUser, updateUser);
router.delete("/:id", validatePutAndDeleteUser, deleteUser);

export default router;
