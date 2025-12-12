// backend/middleware/authorizeResource.js
// ESM module — replace the existing file content with this.

import { pool } from "../db.js";
import validatorPkg from "validator";
const { isUUID } = validatorPkg;

/**
 * Protects object-level access by verifying the resource -> folder -> project -> company chain
 * and comparing with req.user.company_id.
 *
 * Rules:
 *  - Global admins (role === 'admin') bypass checks (they are global)
 *  - For folderId/documentId/versionId/projectId: ensure resource.company_id === req.user.company_id
 *  - If mismatch: insert audit_log (best-effort) and return 403
 *
 * The middleware looks at route params and query params for:
 *   folderId, folder_id
 *   documentId, document_id, id
 *   versionId, version_id
 *   projectId, project_id
 *
 * Usage:
 *   router.get('/folder/:folderId', authMiddleware, authorizeResource, controller)
 */
export default async function authorizeResource(req, res, next) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthenticated" });

    // Global admin bypass
    if (user.role === "admin") {
      return next();
    }

    // normalize candidate ids from params or query
    const folderId = req.params.folderId || req.params.folder_id || req.query.folderId || req.query.folder_id;
    const documentId = req.params.documentId || req.params.document_id || req.params.id || req.query.documentId || req.query.document_id;
    const versionId = req.params.versionId || req.params.version_id || req.query.versionId || req.query.version_id;
    const projectId = req.params.projectId || req.params.project_id || req.query.projectId || req.query.project_id;

    // best-effort audit log inserter (non-blocking)
    const auditLog = async ({ user_id, action, resource_type, resource_id, success = false }) => {
      try {
        await pool.query(
          `INSERT INTO audit_logs(user_id, action, resource_type, resource_id, success, created_at)
           VALUES ($1,$2,$3,$4,$5, now())`,
          [user_id, action, resource_type, resource_id, success]
        );
      } catch (e) {
        // swallow logging errors so auth flow isn't blocked
        console.warn("audit log failed:", e?.message || e);
      }
    };

    // helper to check equality (null-safe)
    const companyMatches = (resourceCompanyId) => {
      // if user has no company_id (should only be admins normally), deny
      if (!user.company_id) return false;
      return String(resourceCompanyId) === String(user.company_id);
    };

    // 1) versionId (document_versions) — protects download routes
    if (versionId) {
      if (!isUUID(versionId)) return res.status(400).json({ error: "Invalid version id" });

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

      const { rows } = await pool.query(q, [versionId]);
      if (!rows.length) return res.status(404).json({ error: "Version not found" });

      if (!companyMatches(rows[0].company_id)) {
        await auditLog({ user_id: user.id, action: "unauthorized_access", resource_type: "version", resource_id: versionId, success: false });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.version = rows[0];
      return next();
    }

    // 2) documentId
    if (documentId) {
      if (!isUUID(documentId)) return res.status(400).json({ error: "Invalid document id" });

      const q = `
        SELECT d.id AS document_id, d.folder_id, f.project_id, p.company_id
        FROM documents d
        JOIN folders f ON f.id = d.folder_id
        JOIN projects p ON p.id = f.project_id
        WHERE d.id = $1
      `;
      const { rows } = await pool.query(q, [documentId]);
      if (!rows.length) return res.status(404).json({ error: "Document not found" });

      if (!companyMatches(rows[0].company_id)) {
        await auditLog({ user_id: user.id, action: "unauthorized_access", resource_type: "document", resource_id: documentId, success: false });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.document = rows[0];
      return next();
    }

    // 3) folderId
    if (folderId) {
      if (!isUUID(folderId)) return res.status(400).json({ error: "Invalid folder id" });

      const q = `
        SELECT f.id AS folder_id, f.project_id, p.company_id
        FROM folders f
        JOIN projects p ON p.id = f.project_id
        WHERE f.id = $1
      `;
      const { rows } = await pool.query(q, [folderId]);
      if (!rows.length) return res.status(404).json({ error: "Folder not found" });

      if (!companyMatches(rows[0].company_id)) {
        await auditLog({ user_id: user.id, action: "unauthorized_access", resource_type: "folder", resource_id: folderId, success: false });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.folder = rows[0];
      return next();
    }

    // 4) projectId
    if (projectId) {
      if (!isUUID(projectId)) return res.status(400).json({ error: "Invalid project id" });

      const { rows } = await pool.query(`SELECT id, company_id FROM projects WHERE id = $1`, [projectId]);
      if (!rows.length) return res.status(404).json({ error: "Project not found" });

      if (!companyMatches(rows[0].company_id)) {
        await auditLog({ user_id: user.id, action: "unauthorized_access", resource_type: "project", resource_id: projectId, success: false });
        return res.status(403).json({ error: "Forbidden" });
      }

      req.project = rows[0];
      return next();
    }

    // No resource ID found — allow
    return next();
  } catch (err) {
    console.error("authorizeResource error:", err);
    return next(err);
  }
}
