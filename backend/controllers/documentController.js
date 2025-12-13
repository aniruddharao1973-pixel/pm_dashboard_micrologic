
// controllers/documentController.js
import { pool } from "../db.js";
import fs from "fs";
import path from "path";
import { sendFileUploadedEmail, sendFileDeletedEmail } from "../utils/mailService.js";
import { insertEmailLog } from "../models/emailLogModel.js";


/* ============================================================================
   FINAL VERSIONING RULES:
   - Versioning is based on FILENAME (NOT title, NOT hash)
   - SAME filename → version++
   - NEW filename → version = 1 (new document)
   - Approval does NOT create new version (handled in approvalController)
============================================================================ */

/* ============================================================================
   API 1: Upload Document (always creates a NEW VERSION)
============================================================================ */
export const uploadDocument = async (req, res) => {
  const { projectId, folderId, title, description, comment } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  if (!projectId || !folderId) {
    return res.status(400).json({ message: "projectId & folderId required" });
  }

  const filename = req.file.originalname;
  const extractedTitle = filename.replace(/\.[^/.]+$/, "");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // STEP 1 — Check if same filename exists (version bump)
    const existing = await client.query(
      `
      SELECT d.id, d.current_version
      FROM documents d
      JOIN document_versions dv ON dv.document_id = d.id
      WHERE d.folder_id = $1 
        AND dv.filename = $2
      ORDER BY d.created_at DESC
      LIMIT 1
      `,
      [folderId, filename]
    );

    let documentId;
    let nextVersion;

    if (existing.rowCount > 0) {
      documentId = existing.rows[0].id;
      nextVersion = existing.rows[0].current_version + 1;

      await client.query(
        `
        UPDATE documents 
        SET current_version = $2,
            status = 'pending'
        WHERE id = $1
        `,
        [documentId, nextVersion]
      );
    } else {
      const newDoc = await client.query(
        `
        INSERT INTO documents
        (project_id, folder_id, title, description, current_version, status, can_download, created_by, created_by_role)
        VALUES ($1,$2,$3,$4,1,'pending',true,$5,$6)
        RETURNING id
        `,
        [
          projectId,
          folderId,
          extractedTitle,
          description || null,
          req.user.id,
          req.user.role,
        ]
      );

      documentId = newDoc.rows[0].id;
      nextVersion = 1;
    }

    // STEP 2 — Insert Version
    const filePath = `/uploads/${req.file.filename}`;
    const changeLog = req.body.changeLog ? JSON.parse(req.body.changeLog) : null;

    const versionRes = await client.query(
      `
      INSERT INTO document_versions
      (document_id, file_path, filename, original_filename, mimetype, size, version_number, uploaded_by, notes, change_log)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        documentId,
        filePath,
        filename,
        req.file.originalname,
        req.file.mimetype,
        req.file.size,
        nextVersion,
        req.user.id,
        comment || null,
        changeLog,
      ]
    );

    await client.query("COMMIT");

    // ⭐⭐⭐ NON-BLOCKING EMAIL BACKGROUND WORK ⭐⭐⭐
    setTimeout(async () => {
      try {
          const meta = await pool.query(
            `
            SELECT 
              p.name AS project_name,
              f.name AS folder_name,
              p.company_id,
              c.name AS company_name
            FROM folders f
            JOIN projects p ON p.id = f.project_id
            JOIN companies c ON c.id = p.company_id
            WHERE f.id = $1
            `,
            [folderId]
          );

        if (meta.rows.length === 0) return;

        const { project_name, folder_name, company_id, company_name } = meta.rows[0];


        const users = await pool.query(
          `
          SELECT u.email 
          FROM users u
          JOIN user_companies uc ON uc.user_id = u.id
          WHERE uc.company_id = $1
          `,
          [company_id]
        );

        for (const user of users.rows) {
          try {
            const emailResp = await sendFileUploadedEmail({
              toEmail: user.email,
              fileName: filename,
              folderName: folder_name,
              projectName: project_name,
                companyName: company_name   // ✔ Now correct
            });

            await insertEmailLog({
              customer_id: null,
              email: user.email,
              subject: `File Uploaded: ${filename}`,
              temporary_password: null,
              body: JSON.stringify(emailResp),
              status: "sent",
              error: null,
            });

          } catch (err) {
            await insertEmailLog({
              customer_id: null,
              email: user.email,
              subject: `File Uploaded: ${filename}`,
              temporary_password: null,
              body: null,
              status: "error",
              error: err.message,
            });
          }
        }
      } catch (err) {
        console.error("Background Email Error:", err);
      }
    }, 0);

    // ⭐⭐⭐ INSTANT RESPONSE TO FRONTEND (no SMTP delay)
    return res.json({
      message: `Uploaded version ${nextVersion}`,
      documentId,
      versionNumber: nextVersion,
      version: versionRes.rows[0],
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Upload Document Error:", err);
    return res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

/* ============================================================================
   API 2: Get Documents by Folder (latest version only)
============================================================================ */
export const getDocumentsByFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId.trim();

    const result = await pool.query(
      `
      SELECT 
          d.id,
          d.title,
          d.current_version,
          d.status,
          d.can_download,
          d.created_at,
          d.created_by,
          d.created_by_role,
          u1.name AS created_by_name,

          dv.file_path,
          dv.filename,
          dv.original_filename,
          dv.version_number,
          dv.uploaded_by,
          u2.name AS uploaded_by_name,

          -- ⭐ REQUIRED FOR authorizeResource security check
          f.project_id,
          p.company_id

      FROM documents d

      JOIN folders f
        ON f.id = d.folder_id

      JOIN projects p
        ON p.id = f.project_id

      LEFT JOIN document_versions dv
        ON dv.document_id = d.id
      AND dv.version_number = d.current_version

      LEFT JOIN users u1 
        ON d.created_by = u1.id

      LEFT JOIN users u2 
        ON dv.uploaded_by = u2.id

      WHERE d.folder_id = $1
      ORDER BY d.created_at DESC
      `,
      [folderId]
    );


    res.json(result.rows);
  } catch (error) {
    console.error("Get Documents Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================================
   API 3: Get ALL VERSIONS with approval info (status + comment)
============================================================================ */
export const getDocumentVersions = async (req, res) => {
  try {
    const documentId = req.params.documentId.trim();

    const result = await pool.query(
      `
    SELECT 
      dv.id,
      dv.file_path,
      dv.filename,
      dv.mimetype,
      dv.original_filename,   -- ⭐ ADD THIS
      dv.size,
      dv.version_number,
      dv.notes AS upload_comment,
      dv.change_log,                      -- ⭐ RETURN CHANGES
      dv.uploaded_by,
      u1.name AS uploaded_by_name,
      dv.created_at,

      da.action AS approval_status,
      da.comment AS approval_comment,
      u2.name AS approved_by_name


      FROM document_versions dv

      LEFT JOIN users u1 
        ON dv.uploaded_by = u1.id

      LEFT JOIN document_approvals da
        ON da.version_id = dv.id
       AND da.created_at = (
            SELECT MAX(created_at) 
            FROM document_approvals 
            WHERE version_id = dv.id
         )

      LEFT JOIN users u2
        ON da.approved_by = u2.id

      WHERE dv.document_id = $1
      ORDER BY dv.version_number DESC
      `,
      [documentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get Versions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================================
   API 4: Delete Document (all versions + files)
============================================================================ */
/* ============================================================================
   API 4: Delete Document (all versions + files)
============================================================================ */
export const deleteDocument = async (req, res) => {
  const documentId = req.params.documentId.trim();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // STEP 1 — Load metadata BEFORE deleting
    const meta = await client.query(
      `
      SELECT 
        d.title,
        p.name AS project_name,
        f.name AS folder_name,
        p.company_id,
        c.name AS company_name
      FROM documents d
      JOIN folders f ON f.id = d.folder_id
      JOIN projects p ON p.id = f.project_id
      JOIN companies c ON c.id = p.company_id
      WHERE d.id = $1
      `,
      [documentId]
    );


    if (meta.rows.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

   const { project_name, folder_name, company_id, company_name, title } = meta.rows[0];

    // STEP 2 — Collect file paths
    const versions = await client.query(
      `SELECT id, file_path FROM document_versions WHERE document_id = $1`,
      [documentId]
    );

    // STEP 3 — Delete approvals
    await client.query(
      `DELETE FROM document_approvals WHERE version_id IN (
         SELECT id FROM document_versions WHERE document_id=$1
       )`,
      [documentId]
    );

    // STEP 4 — Delete versions
    await client.query(
      `DELETE FROM document_versions WHERE document_id = $1`,
      [documentId]
    );

    // STEP 5 — Delete document
    await client.query(`DELETE FROM documents WHERE id=$1`, [documentId]);

    await client.query("COMMIT");

    // STEP 6 — Remove files locally
    versions.rows.forEach(v => {
      if (v.file_path) {
        const full = path.join(process.cwd(), v.file_path.replace(/^\//, ""));
        if (fs.existsSync(full)) fs.unlinkSync(full);
      }
    });

    // ⭐⭐⭐ IMPORTANT ⭐⭐⭐
    // 👉 SEND RESPONSE IMMEDIATELY → TOAST WORKS!
    res.json({ message: "Document deleted successfully" });

    // ============================================================
    // EMAIL PROCESS STARTS *AFTER* RESPONSE (non-blocking)
    // ============================================================

    setTimeout(async () => {
      try {
        const users = await pool.query(
          `SELECT u.email
           FROM users u
           JOIN user_companies uc ON uc.user_id = u.id
           WHERE uc.company_id = $1`,
          [company_id]
        );

        for (const user of users.rows) {
          try {
            await sendFileDeletedEmail({
              toEmail: user.email,
              fileName: title,
              folderName: folder_name,
              projectName: project_name,
              companyName: company_name   // ✔ correct
            });

            await insertEmailLog({
              customer_id: null,
              email: user.email,
              subject: `File Deleted: ${title}`,
              temporary_password: null,
              body: null,
              status: "sent",
              error: null,
            });

          } catch (err) {
            await insertEmailLog({
              customer_id: null,
              email: user.email,
              subject: `File Deleted: ${title}`,
              temporary_password: null,
              body: null,
              status: "error",
              error: err.message,
            });
          }
        }
      } catch (error) {
        console.error("Background email error:", error);
      }
    }, 10);

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};


/* ============================================================================
   API 5: Toggle Download Permission
============================================================================ */
export const toggleDownload = async (req, res) => {
  const { documentId } = req.params;
  const { canDownload } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE documents 
      SET can_download = $1
      WHERE id = $2
      RETURNING id, title, can_download
      `,
      [canDownload, documentId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      message: "Download permission updated",
      document: result.rows[0],
    });
  } catch (err) {
    console.error("Toggle Download Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
