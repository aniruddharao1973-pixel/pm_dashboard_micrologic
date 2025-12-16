// backend/routes/admin.js
import express from "express";

import {
  createCustomer,
  createProject,
  createFolder,
  getCustomers,
  getCustomerById,
  getCompanyProfile,
  updateCustomerProfile,
  deleteCompany,
  deleteProject,
  getProjects,
} from "../controllers/adminController.js";

// import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";
import {
  authMiddleware,
  requireAdminOrTechSales,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------------------------------------------
   1️⃣ Create Customer (Admin Only)
--------------------------------------------------- */
router.post(
  "/create-customer",
  authMiddleware,
  requireAdminOrTechSales,
  createCustomer
);

/* ---------------------------------------------------
   2️⃣ Create Project
--------------------------------------------------- */
router.post(
  "/create-project",
  authMiddleware,
  requireAdminOrTechSales,
  createProject
);

/* ---------------------------------------------------
   3️⃣ Create Folder
--------------------------------------------------- */
router.post(
  "/create-folder",
  authMiddleware,
  requireAdminOrTechSales,
  createFolder
);

/* ---------------------------------------------------
   4️⃣ Get All Customers
--------------------------------------------------- */
router.get("/customers", authMiddleware, requireAdminOrTechSales, getCustomers);

/* ---------------------------------------------------
   5️⃣ Get Customer + Company + Projects
--------------------------------------------------- */
router.get(
  "/customers/:customerId",
  authMiddleware,
  requireAdminOrTechSales,
  getCustomerById
);

/* ---------------------------------------------------
   6️⃣ Get Company Profile
--------------------------------------------------- */
router.get(
  "/company/:companyId",
  authMiddleware,
  requireAdminOrTechSales,
  getCompanyProfile
);

/* ---------------------------------------------------
   7️⃣ Update Company Profile
--------------------------------------------------- */
router.put(
  "/company/:companyId",
  authMiddleware,
  requireAdminOrTechSales,
  updateCustomerProfile
);

/* ---------------------------------------------------
   8️⃣ Delete Entire Company (Users + Projects)
--------------------------------------------------- */
router.delete(
  "/company/:companyId",
  authMiddleware,
  requireAdminOrTechSales,
  deleteCompany
);

/* ---------------------------------------------------
    🔍 Get All Projects (Admin + Tech Sales)
  --------------------------------------------------- */
router.get("/projects", authMiddleware, requireAdminOrTechSales, getProjects);

/* ---------------------------------------------------
   Delete Single Project
--------------------------------------------------- */
router.delete(
  "/project/:projectId",
  authMiddleware,
  requireAdminOrTechSales,
  deleteProject
);

export default router;
