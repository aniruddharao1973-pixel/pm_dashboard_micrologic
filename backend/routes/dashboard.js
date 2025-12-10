import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAdminStats, getCustomerStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Admin dashboard stats
router.get("/admin", authMiddleware, getAdminStats);

// Customer dashboard stats
router.get("/customer", authMiddleware, getCustomerStats);

export default router;
