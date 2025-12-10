// // backend/controllers/foldersController.js
// import { pool } from "../db.js";

// // Get all root folders for a project
// export const getFoldersByProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     const result = await pool.query(
//       `SELECT * 
//        FROM folders 
//        WHERE project_id = $1 AND parent_id IS NULL
//        ORDER BY created_at ASC`,
//       [projectId]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Get Folders Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ⭐ NEW: Get subfolders of a given folder
// export const getSubFolders = async (req, res) => {
//   try {
//     const { folderId } = req.params;

//     const result = await pool.query(
//       `SELECT *
//        FROM folders
//        WHERE parent_id = $1
//        ORDER BY created_at ASC`,
//       [folderId]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Get Subfolders Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




// backend/controllers/foldersController.js
import { pool } from "../db.js";

// ⭐ Get all root folders for a project
export const getFoldersByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT * 
       FROM folders 
       WHERE project_id = $1 AND parent_id IS NULL
       ORDER BY created_at ASC`,
      [projectId]
    );

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
       ORDER BY created_at ASC`,
      [folderId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get Subfolders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ NEW: Get folder info by ID (needed for breadcrumb path)
export const getFolderInfo = async (req, res) => {
  try {
    const { folderId } = req.params;

    const result = await pool.query(
      `SELECT id, name, parent_id, project_id
       FROM folders
       WHERE id = $1`,
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
