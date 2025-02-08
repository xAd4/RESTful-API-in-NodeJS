import express from "express";
import { search } from "../controllers/SearchController";

const router = express.Router();

router.get("/:collection/:term", search);

export default router;
