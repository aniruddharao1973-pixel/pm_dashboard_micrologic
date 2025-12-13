// // C:\Users\hp\Desktop\project management files\project_management - Copy\backend\routes\projects.js
// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { getMyProjects } from "../controllers/projectController.js";
// import { pool } from "../db.js";   // ✅ REQUIRED IMPORT

// const router = express.Router();

// // ⭐ API: Get total project count
// router.get("/count", authMiddleware, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT COUNT(*) FROM projects");

//     res.json({ count: parseInt(result.rows[0].count) });
//   } catch (err) {
//     console.error("Project Count Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ⭐ API: Get projects for logged-in user
// router.get("/", authMiddleware, getMyProjects);

// export default router;


// // backend/routes/projects.js
// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { getMyProjects } from "../controllers/projectController.js";
// import { pool } from "../db.js";

// const router = express.Router();

// // ⭐ API: Get total project count
// router.get("/count", authMiddleware, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT COUNT(*) FROM projects");
//     res.json({ count: parseInt(result.rows[0].count) });
//   } catch (err) {
//     console.error("Project Count Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ⭐ API: Get projects for logged-in user
// router.get("/", authMiddleware, getMyProjects);

// // ⭐ NEW — API: Get single project by ID (Fixes 404 error)
// router.get("/:projectId", authMiddleware, async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     const result = await pool.query(
//       "SELECT * FROM projects WHERE id = $1",
//       [projectId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     res.json(result.rows[0]);

//   } catch (err) {
//     console.error("Get Project By ID Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;




// backend/routes/projects.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMyProjects, getProjectById } from "../controllers/projectController.js";
import authorizeResource from "../middleware/authorizeResource.js";
import { pool } from "../db.js";

const router = express.Router();

/* ---------------------------------------------------
   ⭐ API: Get total project count
--------------------------------------------------- */
router.get("/count", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM projects");
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error("Project Count Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------------------------------------------
   ⭐ API: Get projects for logged-in user
--------------------------------------------------- */
router.get("/", authMiddleware, getMyProjects);

/* ---------------------------------------------------
   ⭐ API: Get single project by ID
   (Fixes FoldersPage 404 error and returns company_name)
--------------------------------------------------- */


router.get("/:projectId", authMiddleware, authorizeResource, getProjectById);


export default router;

