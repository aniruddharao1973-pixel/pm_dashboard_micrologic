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
  "I & C", // ✅ ADD THIS
];

// only  folders of customer need to be appear for action
export const getFoldersByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { role } = req.user;

    let query;
    let params;

    if (role === "admin" || role === "techsales") {
      query = `
    SELECT id, name, parent_id, project_id,
           customer_can_view, customer_can_download,
           customer_can_upload, customer_can_delete,
           created_at
    FROM folders
    WHERE project_id = $1
      AND parent_id IS NULL
      AND deleted_at IS NULL
    ORDER BY name ASC
  `;
      params = [projectId];
    } else if (role === "customer") {
      query = `
        SELECT id, name, parent_id, project_id,
               customer_can_view, customer_can_download,
               customer_can_upload, customer_can_delete,
               created_at
        FROM folders
        WHERE project_id = $1
          AND parent_id IS NULL
          AND deleted_at IS NULL
          AND name = ANY($2)
        ORDER BY created_at ASC
      `;
      params = [projectId, CUSTOMER_ALLOWED_FOLDERS];
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Get Folders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Customer Access Control folders (root + Customer Documents subfolders)
export const getCustomerAccessFolders = async (req, res) => {
  try {
    const { projectId } = req.params;

    const query = `
      SELECT
        f.id,
        f.name,
        f.parent_id,
        f.project_id,
        f.customer_can_view,
        f.customer_can_download,
        f.customer_can_upload,
        f.customer_can_delete,
        f.created_at,
        CASE
          WHEN f.name = 'Customer Documents' THEN 'header'
          WHEN f.parent_id IS NOT NULL THEN 'subfolder'
          ELSE 'root'
        END AS row_type
      FROM folders f
      WHERE f.project_id = $1
        AND f.deleted_at IS NULL
        AND (
          f.name = 'Customer Documents'
          OR f.parent_id = (
            SELECT id FROM folders
            WHERE name = 'Customer Documents'
              AND project_id = $1
              AND deleted_at IS NULL
          )
          OR (f.parent_id IS NULL AND f.name = ANY($2))
        )
      ORDER BY
        CASE WHEN f.name = 'Customer Documents' THEN 0 ELSE 1 END,
        f.parent_id NULLS FIRST,
        f.name ASC
    `;

    const result = await pool.query(query, [
      projectId,
      CUSTOMER_ALLOWED_FOLDERS,
    ]);

    res.json(result.rows);
  } catch (err) {
    console.error("Customer Access Folder Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Get subfolders of a given folder
export const getSubFolders = async (req, res) => {
  try {
    const { folderId } = req.params;

    const result = await pool.query(
      `
      WITH RECURSIVE folder_tree AS (
        SELECT
          id,
          name,
          parent_id,
          project_id,
          customer_can_view,
          customer_can_download,
          customer_can_upload,
          customer_can_delete,
          created_at
        FROM folders
        WHERE id = $1
          AND deleted_at IS NULL

        UNION ALL

        SELECT
          f.id,
          f.name,
          f.parent_id,
          f.project_id,
          p.customer_can_view,
          p.customer_can_download,
          p.customer_can_upload,
          p.customer_can_delete,
          f.created_at
        FROM folders f
        JOIN folder_tree p ON f.parent_id = p.id
        WHERE f.deleted_at IS NULL
      )
      SELECT *
      FROM folder_tree
      WHERE id != $1
      ORDER BY name ASC
      `,
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
      SELECT
        id,
        name,
        parent_id,
        project_id,
        customer_can_view,
        customer_can_download,
        customer_can_upload,
        customer_can_delete,
        created_at
      FROM folders
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [folderId]
    );
    console.log("[FOLDER INFO]", {
      folderId,
      perms: result.rows[0],
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get Folder Info Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Update customer permissions for a SINGLE folder only
export const updateFolderPermissions = async (req, res) => {
  try {
    const { folderId } = req.params;
    const {
      customer_can_view,
      customer_can_download,
      customer_can_upload,
      customer_can_delete,
    } = req.body;

    if (!["admin", "techsales"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await pool.query(
      `
      UPDATE folders
      SET
        customer_can_view = $1,
        customer_can_download = $2,
        customer_can_upload = $3,
        customer_can_delete = $4
      WHERE id = $5
        AND deleted_at IS NULL
      RETURNING id, name
      `,
      [
        customer_can_view,
        customer_can_download,
        customer_can_upload,
        customer_can_delete,
        folderId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.json({
      message: "Folder permissions updated",
      folder: result.rows[0],
    });
  } catch (error) {
    console.error("Update Folder Permissions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
