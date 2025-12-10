// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { pool } from "../db.js";  // ✅ FIXED: required
// import {
//   getFoldersByProject,
//   getSubFolders
// } from "../controllers/foldersController.js";

// const router = express.Router();

// // ⭐ Count all folders
// router.get("/count", authMiddleware, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT COUNT(*) FROM folders");
//     res.json({ count: parseInt(result.rows[0].count) });
//   } catch (err) {
//     console.error("Folder Count Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ⭐ Get subfolders of a folder (frontend expects /sub/:folderId)
// router.get("/sub/:folderId", authMiddleware, getSubFolders);

// // ⭐ Get ALL root folders of a project
// router.get("/:projectId", authMiddleware, getFoldersByProject);

// export default router;


// routes/folders.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { pool } from "../db.js";

import {
  getFoldersByProject,
  getSubFolders,
  getFolderInfo   // ⭐ NEW: Added controller import
} from "../controllers/foldersController.js";

const router = express.Router();

// ⭐ Count all folders
router.get("/count", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM folders");
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error("Folder Count Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ⭐ NEW: Get single folder details (id, name, parent_id) -> breadcrumb needs this
router.get("/info/:folderId", authMiddleware, getFolderInfo);

// ⭐ Get subfolders of a folder
router.get("/sub/:folderId", authMiddleware, getSubFolders);

// ⭐ Get ALL root folders of a project
router.get("/:projectId", authMiddleware, getFoldersByProject);

export default router;
