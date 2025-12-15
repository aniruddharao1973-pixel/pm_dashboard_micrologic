// routes/folders.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import authorizeResource from "../middleware/authorizeResource.js"; // ⭐ added
import { pool } from "../db.js";

import {
  getFoldersByProject,
  getSubFolders,
  getFolderInfo,
} from "../controllers/foldersController.js";

const router = express.Router();

// Count folders
router.get("/count", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM folders WHERE deleted_at IS NULL"
    );
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error("Folder Count Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single folder info
router.get(
  "/info/:folderId",
  (req, res, next) => {
    console.log("🔥 HIT /folders/info/:folderId");
    console.log("Params:", req.params);
    next();
  },
  authMiddleware,
  authorizeResource,
  getFolderInfo
);

// Get subfolders
router.get(
  "/sub/:folderId",
  (req, res, next) => {
    console.log("🔥 HIT /folders/sub/:folderId");
    console.log("Params:", req.params);
    next();
  },
  authMiddleware,
  authorizeResource,
  getSubFolders
);

// Get all folders in a project
router.get(
  "/:projectId",
  (req, res, next) => {
    console.log("🔥 HIT /folders/:projectId");
    console.log("Params:", req.params);
    next();
  },
  authMiddleware,
  authorizeResource,
  getFoldersByProject
);

// NEW: Correct route used by frontend
router.get(
  "/project/:projectId/folders",
  (req, res, next) => {
    console.log("🔥 HIT /folders/project/:projectId/folders");
    console.log("Params:", req.params);
    next();
  },
  authMiddleware,
  authorizeResource,
  getFoldersByProject
);

export default router;
