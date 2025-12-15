// backend/controllers/foldersController.js
import { pool } from "../db.js";

const CUSTOMER_ALLOWED_FOLDERS = [
  "Customer Documents",
  "Proposal",
  "Software Documents",
  "DAP",
  "Media Assets",
  "Design Documents",
  "User Manual",
  "M O M",
  "Dispatch Clearance",
];

export const getFoldersByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { role } = req.user;

    let query = `
      SELECT id, name, parent_id, project_id
      FROM folders
      WHERE project_id = $1
        AND parent_id IS NULL
        AND deleted_at IS NULL
      ORDER BY created_at ASC
    `;
    let params = [projectId];

    if (role === "customer") {
      query = `
        SELECT id, name, parent_id, project_id
        FROM folders
        WHERE project_id = $1
          AND parent_id IS NULL
          AND deleted_at IS NULL
          AND name = ANY($2)
        ORDER BY created_at ASC
      `;
      params = [projectId, CUSTOMER_ALLOWED_FOLDERS];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Get Folders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ⭐ Get subfolders of a given folder
export const getSubFolders = async (req, res) => {
  try {
    const { folderId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM folders
        WHERE parent_id = $1
    AND deleted_at IS NULL

       ORDER BY created_at ASC`,
      [folderId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get Subfolders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Get folder info by ID (needed for breadcrumb path)
export const getFolderInfo = async (req, res) => {
  try {
    const { folderId } = req.params;

    const result = await pool.query(
      `
      SELECT id, name, parent_id, project_id
      FROM folders
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [folderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get Folder Info Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
