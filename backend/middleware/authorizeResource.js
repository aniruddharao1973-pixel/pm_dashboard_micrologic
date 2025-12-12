// backend/middleware/authorizeResource.js
import { pool as db } from "../db.js";
import validator from "validator";
const { isUUID } = validator;


export default async function authorizeResource(req, res, next) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthenticated" });

    // ⭐ ADMIN & TECH SALES CAN ACCESS EVERYTHING
    if (user.role === "admin" || user.role === "techsales") {
      return next();
    }

    // Extract IDs
    const folderId =
      req.params.folderId ||
      req.params.folder_id ||
      req.query.folderId ||
      req.query.folder_id;

    const documentId =
      req.params.documentId ||
      req.params.document_id ||
      req.query.documentId ||
      req.query.document_id;

    const projectId =
      req.params.projectId ||
      req.params.project_id ||
      req.query.projectId ||
      req.query.project_id;

    const versionId = req.params.versionId || req.query.versionId;

    // helper audit logger
    const auditLog = async ({
      user_id,
      action,
      resource_type,
      resource_id,
      success = false,
    }) => {
      try {
        await db.query(
          `INSERT INTO audit_logs(user_id, action, resource_type, resource_id, success, created_at)
           VALUES ($1,$2,$3,$4,$5, now())`,
          [user_id, action, resource_type, resource_id, success]
        );
      } catch (e) {}
    };

    /* ----------------------------------------------------------
       FOLDER VALIDATION
    ---------------------------------------------------------- */
    if (folderId) {
      if (!isUUID(folderId))
        return res.status(400).json({ error: "Invalid folder id" });

      const q = `
        SELECT f.id AS folder_id, f.project_id, p.company_id
        FROM folders f
        JOIN projects p ON p.id = f.project_id
        WHERE f.id = $1
      `;
      const { rows } = await db.query(q, [folderId]);
      if (!rows.length)
        return res.status(404).json({ error: "Folder not found" });

      if (String(rows[0].company_id) !== String(user.company_id)) {
        await auditLog({
          user_id: user.id,
          action: "unauthorized_access",
          resource_type: "folder",
          resource_id: folderId,
        });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.folder = rows[0];
      return next();
    }

    /* ----------------------------------------------------------
       DOCUMENT VALIDATION
    ---------------------------------------------------------- */
    if (documentId) {
      if (!isUUID(documentId))
        return res.status(400).json({ error: "Invalid document id" });

      const q = `
        SELECT d.id AS document_id, d.folder_id, f.project_id, p.company_id
        FROM documents d
        JOIN folders f ON f.id = d.folder_id
        JOIN projects p ON p.id = f.project_id
        WHERE d.id = $1
      `;
      const { rows } = await db.query(q, [documentId]);

      if (!rows.length)
        return res.status(404).json({ error: "Document not found" });

      if (String(rows[0].company_id) !== String(user.company_id)) {
        await auditLog({
          user_id: user.id,
          action: "unauthorized_access",
          resource_type: "document",
          resource_id: documentId,
        });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.document = rows[0];
      return next();
    }

    /* ----------------------------------------------------------
       PROJECT VALIDATION
    ---------------------------------------------------------- */
    if (projectId) {
      if (!isUUID(projectId))
        return res.status(400).json({ error: "Invalid project id" });

      const { rows } = await db.query(
        `SELECT id, company_id FROM projects WHERE id = $1`,
        [projectId]
      );

      if (!rows.length)
        return res.status(404).json({ error: "Project not found" });

      if (String(rows[0].company_id) !== String(user.company_id)) {
        await auditLog({
          user_id: user.id,
          action: "unauthorized_access",
          resource_type: "project",
          resource_id: projectId,
        });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.project = rows[0];
      return next();
    }

    /* ----------------------------------------------------------
       VERSION VALIDATION
    ---------------------------------------------------------- */
    if (versionId) {
      if (!isUUID(versionId))
        return res.status(400).json({ error: "Invalid version id" });

      const q = `
        SELECT 
          dv.id AS version_id,
          d.id AS document_id,
          d.folder_id,
          f.project_id,
          p.company_id
        FROM document_versions dv
        JOIN documents d ON d.id = dv.document_id
        JOIN folders f ON f.id = d.folder_id
        JOIN projects p ON p.id = f.project_id
        WHERE dv.id = $1
      `;

      const { rows } = await db.query(q, [versionId]);

      if (!rows.length)
        return res.status(404).json({ error: "Version not found" });

      if (String(rows[0].company_id) !== String(user.company_id)) {
        await auditLog({
          user_id: user.id,
          action: "unauthorized_access",
          resource_type: "version",
          resource_id: versionId,
        });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.version = rows[0];
      return next();
    }

    /* ---------------------------------------------------------- */
    return next();
  } catch (err) {
    return next(err);
  }
}
