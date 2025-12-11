// //pm_dashboard_micrologic\backend\routes\dashboard.js
// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { getAdminStats, getCustomerStats } from "../controllers/dashboardController.js";

// const router = express.Router();

// // Admin dashboard stats
// router.get("/admin", authMiddleware, getAdminStats);

// // Customer dashboard stats
// router.get("/customer", authMiddleware, getCustomerStats);

// export default router;


// pm_dashboard_micrologic/backend/routes/dashboard.js
import express from "express";
import { authMiddleware, requireAdminOrTechSales } from "../middleware/authMiddleware.js";
import { getAdminStats, getCustomerStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Admin + TechSales dashboard stats
router.get("/admin", authMiddleware, requireAdminOrTechSales, getAdminStats);

// Customer dashboard stats
router.get("/customer", authMiddleware, getCustomerStats);

export default router;
