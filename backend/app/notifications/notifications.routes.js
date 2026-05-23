import express from "express";
import { getMyNotifications } from "./notifications.controller.js";
import { protect, restrictTo } from "../core/middleware.js";
import { paginationQueryValidator } from "../core/validators.js";

const router = express.Router();

router.get("/", protect, restrictTo("jobseeker"), paginationQueryValidator, getMyNotifications);

export default router;
