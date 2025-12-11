// // backend/routes/admin.js
// import {
//   createCustomer,
//   createProject,
//   createFolder,
//   getCustomers,
//   getCustomerById,
//   deleteCustomer,
//   getCompanyProfile,
//   updateCustomerProfile,
//   addCollaborator   // ✅ ADD THIS LINE
// } from "../controllers/adminController.js";


// import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";

// const router = express.Router();

// /* ---------------------------------------------------
//    1️⃣ Create Customer (Admin Only)
// --------------------------------------------------- */
// router.post(
//   "/create-customer",
//   authMiddleware,
//   requireRole("admin"),
//   createCustomer
// );

// /* ---------------------------------------------------
//    2️⃣ Create Project (Admin Only) — Now uses companyId
// --------------------------------------------------- */
// router.post(
//   "/create-project",
//   authMiddleware,
//   requireRole("admin"),
//   createProject
// );

// /* ---------------------------------------------------
//    3️⃣ Create Folder
// --------------------------------------------------- */
// router.post(
//   "/create-folder",
//   authMiddleware,
//   requireRole("admin"),
//   createFolder
// );

// /* ---------------------------------------------------
//    4️⃣ Get All Customers (Grouped by Company)
// --------------------------------------------------- */
// router.get(
//   "/customers",
//   authMiddleware,
//   requireRole("admin"),
//   getCustomers
// );

// /* ---------------------------------------------------
//    5️⃣ Get Customer + Their Company + Projects
// --------------------------------------------------- */
// router.get(
//   "/customers/:customerId",
//   authMiddleware,
//   requireRole("admin"),
//   getCustomerById
// );

// /* ---------------------------------------------------
//    6️⃣ Delete Customer (+ cascade delete projects)
// --------------------------------------------------- */
// router.delete(
//   "/customers/:customerId",
//   authMiddleware,
//   requireRole("admin"),
//   deleteCustomer
// );

// /* ---------------------------------------------------
//    7️⃣ Get Company Profile
// --------------------------------------------------- */
// router.get(
//   "/company/:companyId",
//   authMiddleware,
//   requireRole("admin"),
//   getCompanyProfile
// );

// /* ---------------------------------------------------
//    8️⃣ Update Company Profile (NEW)
// --------------------------------------------------- */
// router.put(
//   "/company/:companyId",
//   authMiddleware,
//   requireRole("admin"),
//   updateCustomerProfile
// );

// /* ---------------------------------------------------
//    🔟 Add Collaborator (Admin Only)
// --------------------------------------------------- */
// router.post(
//   "/add-collaborator",
//   authMiddleware,
//   requireRole("admin"),
//   addCollaborator
// );


// export default router;




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
  addCollaborator,
  deleteCompany,   
  deleteCollaborator,
  deleteProject,
   getProjects 
} from "../controllers/adminController.js";

// import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";
import { authMiddleware, requireAdminOrTechSales } from "../middleware/authMiddleware.js";


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
router.get(
  "/customers",
  authMiddleware,
  requireAdminOrTechSales,
  getCustomers
);

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
   8️⃣ Delete Entire Company (Users + Collaborators + Projects)
--------------------------------------------------- */
router.delete(
  "/company/:companyId",
  authMiddleware,
  requireAdminOrTechSales,
  deleteCompany
);

/* ---------------------------------------------------
   9️⃣ Add Collaborator
--------------------------------------------------- */
router.post(
  "/add-collaborator",
  authMiddleware,
  requireAdminOrTechSales,
  addCollaborator
);

/* ---------------------------------------------------
   🔟 Delete Collaborator Only
--------------------------------------------------- */
router.delete(
  "/collaborator/:userId",
  authMiddleware,
  requireAdminOrTechSales,
  deleteCollaborator
);

  /* ---------------------------------------------------
    🔍 Get All Projects (Admin + Tech Sales)
  --------------------------------------------------- */
  router.get(
    "/projects",
    authMiddleware,
    requireAdminOrTechSales,
    getProjects
  );

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
