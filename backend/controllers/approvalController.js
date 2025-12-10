// // controllers/approvalController.js
// import { pool } from "../db.js";
// import { io } from "../server.js";

// /*
// =========================================
//  ADMIN — START APPROVAL
// =========================================
// POST /api/approvals/start
// */
// export const startApproval = async (req, res) => {
//   const { documentId } = req.body;
//   const userId = req.user.id;
//   const role = req.user.role;

//   try {
//     // Only admin can start an approval
//     // if (role !== "admin") {
//     //   return res.status(403).json({ message: "Access denied" });
//     // }

//     // Fetch document uploader role
// const docRes = await pool.query(
//   "SELECT created_by_role FROM documents WHERE id = $1",
//   [documentId]
// );
// if (docRes.rowCount === 0) {
//   return res.status(404).json({ message: "Document not found" });
// }

// const uploaderRole = docRes.rows[0].created_by_role;

// // ❌ Uploader cannot start approval
// if (role === uploaderRole) {
//   return res.status(403).json({ message: "Uploader cannot approve their own file" });
// }

// // ✔ Opposite role can start approval (either admin or customer)


//     // 1. Check if document already has active approval
//     const existing = await pool.query(
//       `
//       SELECT * FROM approvals
//       WHERE document_id = $1 AND status IN ('pending','in_progress')
//     `,
//       [documentId]
//     );

//     if (existing.rows.length > 0) {
//       return res.status(400).json({ message: "Approval already active" });
//     }

//     // TRANSACTION START
//     const client = await pool.connect();
//     try {
//       await client.query("BEGIN");

//       // 2. Create approval instance
//       const approvalRes = await client.query(
//         `
//         INSERT INTO approvals (document_id, status, started_by)
//         VALUES ($1, 'in_progress', $2)
//         RETURNING id
//       `,
//         [documentId, userId]
//       );

//       const approvalId = approvalRes.rows[0].id;

//       // 3. Create ONE step → customer must approve
//       // await client.query(
//       //   `
//       //   INSERT INTO approval_steps (approval_id, approver_role, status)
//       //   VALUES ($1, 'customer', 'pending')
//       // `,
//       //   [approvalId]
//       // );

//       // Determine reviewer role (opposite of uploader)
//       const reviewerRole = uploaderRole === "admin" ? "customer" : "admin";

//       // 3. Create ONE step → reviewer must approve
//       await client.query(
//         `
//         INSERT INTO approval_steps (approval_id, approver_role, status)
//         VALUES ($1, $2, 'pending')
//         `,
//         [approvalId, reviewerRole]
//       );



//       // 4. Update document status
//       await client.query(
//         `
//         UPDATE documents
//         SET status = 'pending_approval'
//         WHERE id = $1
//       `,
//         [documentId]
//       );

//       // 5. Audit log
//       await client.query(
//         `
//         INSERT INTO audit_logs (entity_type, entity_id, action, user_id)
//         VALUES ('document', $1, 'approval_started', $2)
//       `,
//         [documentId, userId]
//       );

//       await client.query("COMMIT");

//       // 🔥 REAL-TIME EVENT: approval started
//       io.to(`document_${documentId}`).emit("approval_updated", {
//         type: "approval_started",
//         approvalId,
//         documentId,
//         started_by: userId,
//       });

//       res.json({ message: "Approval started", approvalId });
//     } catch (err) {
//       await client.query("ROLLBACK");
//       throw err;
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error("startApproval error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /*
// =========================================
//  CUSTOMER OR ADMIN — ACTION (Approve/Reject/In-review)
// =========================================
// POST /api/approvals/:approvalId/action
// */
// export const actOnApproval = async (req, res) => {
//   const { approvalId } = req.params;
//   const { action, comment } = req.body;
//   const userId = req.user.id;
//   const role = req.user.role;

//   // only customer or admin can act
//   if (!["customer", "admin"].includes(role)) {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     // Fetch approval and step
//     const approval = await pool.query(
//       `SELECT * FROM approvals WHERE id = $1`,
//       [approvalId]
//     );
//     if (approval.rows.length === 0) {
//       return res.status(404).json({ message: "Approval not found" });
//     }

//     const step = await pool.query(
//       `
//       SELECT * FROM approval_steps
//       WHERE approval_id = $1 AND status = 'pending'
//       LIMIT 1
//     `,
//       [approvalId]
//     );

//     if (step.rows.length === 0) {
//       return res.status(400).json({ message: "No pending steps" });
//     }

//     const stepRow = step.rows[0];
//     const documentId = approval.rows[0].document_id;

//     // If role is customer → must follow step approver_role
//     // if (role === "customer" && stepRow.approver_role !== "customer") {
//     //   return res.status(403).json({ message: "You cannot act on this step" });
//     // }

//     // BOTH roles must match the approval step role
//     if (role !== stepRow.approver_role) {
//       return res.status(403).json({ message: "You cannot act on this step" });
//     }


//     // TRANSACTION
//     const client = await pool.connect();
//     try {
//       await client.query("BEGIN");

//       // 1. Update step
//       await client.query(
//         `
//         UPDATE approval_steps
//         SET status = $1, acted_by = $2, acted_at = now()
//         WHERE id = $3
//       `,
//         [action, userId, stepRow.id]
//       );

//       // 2. Insert historical record (document_approvals)
//       await client.query(
//         `
//         INSERT INTO document_approvals (document_id, version_id, approved_by, action, comment)
//         VALUES ($1, NULL, $2, $3, $4)
//       `,
//         [documentId, userId, action, comment || null]
//       );

//       // 3. Audit log
//     await client.query(
//     `
//     INSERT INTO audit_logs (entity_type, entity_id, action, user_id, meta)
//     VALUES ('document', $1, 'approval_action', $2, jsonb_build_object('action', $3::text))
//     `,
//     [documentId, userId, action]
//     );


//       // 4. Update approval + document status
//       if (action === "approved") {
//         await client.query(
//           `UPDATE approvals SET status='completed' WHERE id = $1`,
//           [approvalId]
//         );
//         await client.query(
//           `UPDATE documents SET status='approved' WHERE id = $1`,
//           [documentId]
//         );
//       } else if (action === "rejected") {
//         await client.query(
//           `UPDATE approvals SET status='rejected' WHERE id = $1`,
//           [approvalId]
//         );
//         await client.query(
//           `UPDATE documents SET status='rejected' WHERE id = $1`,
//           [documentId]
//         );
//       } else {
//         await client.query(
//           `UPDATE approvals SET status='in_review' WHERE id = $1`,
//           [approvalId]
//         );
//         await client.query(
//           `UPDATE documents SET status='in_review' WHERE id = $1`,
//           [documentId]
//         );
//       }

//       await client.query("COMMIT");

//       // 🔥 REAL-TIME EVENT: approval action taken
//       io.to(`document_${documentId}`).emit("approval_updated", {
//         type: "action",
//         action,
//         acted_by: userId,
//         approvalId,
//         documentId,
//         comment: comment || null,
//       });

//       res.json({ message: "Action recorded" });
//     } catch (err) {
//       await client.query("ROLLBACK");
//       throw err;
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error("actOnApproval error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // controllers/approvalController.js
// import { pool } from "../db.js";
// import { io } from "../server.js";

// /* ============================================================================
//    OLD LOGIC — Approve/Reject by Version (KEEPED for compatibility)
// ============================================================================ */
// export const approveDocumentVersion = async (req, res) => {
//   const { versionId } = req.params;
//   const { comment } = req.body;
//   const userId = req.user.id;
//   const userRole = req.user.role;

//   if (!comment || comment.trim().length === 0) {
//     return res.status(400).json({ message: "Approval comment is required" });
//   }

//   try {
//     const versionRes = await pool.query(`
//       SELECT dv.document_id, dv.version_number, d.created_by, d.created_by_role
//       FROM document_versions dv
//       JOIN documents d ON dv.document_id = d.id
//       WHERE dv.id = $1
//     `, [versionId]);

//     if (versionRes.rowCount === 0) {
//       return res.status(404).json({ message: "Version not found" });
//     }

//     const { document_id, created_by, created_by_role } = versionRes.rows[0];

//     if (created_by === userId || created_by_role === userRole) {
//       return res.status(403).json({ message: "Uploader cannot approve their own file" });
//     }

//     await pool.query(`
//       INSERT INTO document_approvals (document_id, version_id, approved_by, action, comment)
//       VALUES ($1, $2, $3, 'approved', $4)
//     `, [document_id, versionId, userId, comment]);

//     await pool.query(
//       `UPDATE documents SET status = 'approved' WHERE id = $1`,
//       [document_id]
//     );

//     io.to(`document_${document_id}`).emit("document_approval_update", {
//       versionId,
//       documentId: document_id,
//       action: "approved",
//       approved_by: userId,
//       comment,
//     });

//     res.json({ message: "Document approved" });
//   } catch (err) {
//     console.error("Approve Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const rejectDocumentVersion = async (req, res) => {
//   const { versionId } = req.params;
//   const { comment } = req.body;
//   const userId = req.user.id;
//   const userRole = req.user.role;

//   if (!comment || comment.trim().length === 0) {
//     return res.status(400).json({ message: "Rejection comment is required" });
//   }

//   try {
//     const versionRes = await pool.query(`
//       SELECT dv.document_id, dv.version_number, d.created_by, d.created_by_role
//       FROM document_versions dv
//       JOIN documents d ON dv.document_id = d.id
//       WHERE dv.id = $1
//     `, [versionId]);

//     if (versionRes.rowCount === 0) {
//       return res.status(404).json({ message: "Version not found" });
//     }

//     const { document_id, created_by, created_by_role } = versionRes.rows[0];

//     if (created_by === userId || created_by_role === userRole) {
//       return res.status(403).json({ message: "Uploader cannot reject their own file" });
//     }

//     await pool.query(`
//       INSERT INTO document_approvals (document_id, version_id, approved_by, action, comment)
//       VALUES ($1, $2, $3, 'rejected', $4)
//     `, [document_id, versionId, userId, comment]);

//     await pool.query(
//       `UPDATE documents SET status = 'rejected' WHERE id = $1`,
//       [document_id]
//     );

//     io.to(`document_${document_id}`).emit("document_approval_update", {
//       versionId,
//       documentId: document_id,
//       action: "rejected",
//       approved_by: userId,
//       comment,
//     });

//     res.json({ message: "Document rejected" });
//   } catch (err) {
//     console.error("Reject Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================================
//    NEW LOGIC — Your ViewFileModal uses THIS
//    (start -> action -> getMeta)
// ============================================================================ */

// /* 🔹 START WORKFLOW */
// export const startApproval = async (req, res) => {
//   const { documentId } = req.body;

//   try {
//     const docRes = await pool.query(
//       `SELECT created_by_role FROM documents WHERE id = $1`,
//       [documentId]
//     );

//     if (docRes.rowCount === 0)
//       return res.status(404).json({ message: "Document not found" });

//     const createdRole = docRes.rows[0].created_by_role;
//     const reviewerRole = createdRole === "admin" ? "customer" : "admin";

//     const result = await pool.query(
//       `
//       INSERT INTO approvals (document_id, status, current_step_role)
//       VALUES ($1, 'pending_approval', $2)
//       RETURNING *
//       `,
//       [documentId, reviewerRole]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Start Approval Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* 🔹 TAKE ACTION (approve / reject) */
// export const actOnApproval = async (req, res) => {
//   const { approvalId } = req.params;
//   const { action, comment } = req.body;
//   const userId = req.user.id;

//   if (!comment)
//     return res.status(400).json({ message: "Comment is required" });

//   try {
//     const approvalRes = await pool.query(
//       `SELECT document_id FROM approvals WHERE id = $1`,
//       [approvalId]
//     );

//     if (approvalRes.rowCount === 0)
//       return res.status(404).json({ message: "Approval not found" });

//     const documentId = approvalRes.rows[0].document_id;

//     await pool.query(
//       `
//       INSERT INTO approval_history (approval_id, action, comment, acted_by)
//       VALUES ($1, $2, $3, $4)
//       `,
//       [approvalId, action, comment, userId]
//     );

//     await pool.query(
//       `UPDATE approvals SET status = $1 WHERE id = $2`,
//       [action, approvalId]
//     );

//     await pool.query(
//       `UPDATE documents SET status = $1 WHERE id = $2`,
//       [action, documentId]
//     );

//     io.to(`document_${documentId}`).emit("approval_updated", {
//       documentId,
//       approvalId,
//       action,
//       comment,
//     });

//     res.json({ success: true, action });
//   } catch (err) {
//     console.error("Approval Action Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* 🔹 GET APPROVAL META (status + role) */
// // export const getApprovalMeta = async (req, res) => {
// //   const { documentId } = req.params;

// //   try {
// //     const result = await pool.query(
// //       `
// //       SELECT id AS approvalId, status, current_step_role
// //       FROM approvals
// //       WHERE document_id = $1
// //       ORDER BY created_at DESC
// //       LIMIT 1
// //       `,
// //       [documentId]
// //     );

// //     if (result.rowCount === 0)
// //       return res.status(404).json({ message: "No approval found" });

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("Get Approval Meta Error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// /* ============================================================================
//    REMAINING OLD LOGIC
// ============================================================================ */
// export const getDocumentApprovals = async (req, res) => {
//   const { documentId } = req.params;

//   try {
//     const result = await pool.query(
//       `
//       SELECT da.*, u.name AS approved_by_name
//       FROM document_approvals da
//       LEFT JOIN users u ON da.approved_by = u.id
//       WHERE da.document_id = $1
//       ORDER BY da.created_at DESC
//       `,
//       [documentId]
//     );

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Get Document Approvals Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getVersionApprovals = async (req, res) => {
//   const { versionId } = req.params;

//   try {
//     const result = await pool.query(
//       `
//       SELECT da.*, u.name AS approved_by_name
//       FROM document_approvals da
//       LEFT JOIN users u ON da.approved_by = u.id
//       WHERE da.version_id = $1
//       ORDER BY da.created_at DESC
//       `,
//       [versionId]
//     );

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Get Version Approvals Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// controllers/approvalController.js
import { pool } from "../db.js";
import { io } from "../server.js";

/* ============================================================================
   FINAL APPROVAL LOGIC
   - Approve/Reject updates SAME version
   - Opposite role rule enforced
   - No version increment for approval
============================================================================ */

/** Fetch version + uploader info */
async function getVersionData(versionId) {
  const versionRes = await pool.query(
    `
    SELECT 
      dv.id AS version_id,
      dv.document_id,
      dv.version_number,
      dv.uploaded_by AS uploader_id,
      u.role AS uploader_role
    FROM document_versions dv
    LEFT JOIN users u ON dv.uploaded_by = u.id
    WHERE dv.id = $1
    `,
    [versionId]
  );

  if (versionRes.rowCount === 0) return null;
  return versionRes.rows[0];
}

/* ============================================================================
   APPROVE VERSION
============================================================================ */
export const approveDocumentVersion = async (req, res) => {
  const { versionId } = req.params;
  const { comment } = req.body;
  const approverId = req.user.id;
  const approverRole = req.user.role;

  // 🚫 RULE: Collaborators cannot approve documents
  if (approverRole === "collaborator") {
    return res.status(403).json({
      message: "Collaborators cannot approve documents",
    });
  }

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: "Approval comment is required" });
  }

  try {
    const version = await getVersionData(versionId);
    if (!version) return res.status(404).json({ message: "Version not found" });

    const { document_id, uploader_id, uploader_role } = version;

    // Opposite-role validation
    if (approverId === uploader_id || approverRole === uploader_role) {
      return res
        .status(403)
        .json({ message: "Uploader cannot approve their own file" });
    }

    // Insert approval history
    await pool.query(
      `
      INSERT INTO document_approvals 
      (document_id, version_id, approved_by, action, comment)
      VALUES ($1, $2, $3, 'approved', $4)
      `,
      [document_id, versionId, approverId, comment]
    );

    // Update main document status
    await pool.query(
      `UPDATE documents SET status = 'approved' WHERE id = $1`,
      [document_id]
    );

    // Emit socket event
    io.to(`document_${document_id}`).emit("document_approval_update", {
      documentId: document_id,
      versionId,
      action: "approved",
      approved_by: approverId,
      comment,
    });

    res.json({ message: "Document approved successfully" });
  } catch (err) {
    console.error("Approve Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ============================================================================
   REJECT VERSION
============================================================================ */
export const rejectDocumentVersion = async (req, res) => {
  const { versionId } = req.params;
  const { comment } = req.body;
  const approverId = req.user.id;
  const approverRole = req.user.role;

  // 🚫 RULE: Collaborators cannot reject documents
  if (approverRole === "collaborator") {
    return res.status(403).json({
      message: "Collaborators cannot reject documents",
    });
  }

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: "Rejection comment is required" });
  }

  try {
    const version = await getVersionData(versionId);
    if (!version) return res.status(404).json({ message: "Version not found" });

    const { document_id, uploader_id, uploader_role } = version;

    // Opposite-role validation
    if (approverId === uploader_id || approverRole === uploader_role) {
      return res
        .status(403)
        .json({ message: "Uploader cannot reject their own file" });
    }

    // Insert history
    await pool.query(
      `
      INSERT INTO document_approvals 
      (document_id, version_id, approved_by, action, comment)
      VALUES ($1, $2, $3, 'rejected', $4)
      `,
      [document_id, versionId, approverId, comment]
    );

    // Update main document status
    await pool.query(
      `UPDATE documents SET status = 'rejected' WHERE id = $1`,
      [document_id]
    );

    // Emit socket update
    io.to(`document_${document_id}`).emit("document_approval_update", {
      documentId: document_id,
      versionId,
      action: "rejected",
      approved_by: approverId,
      comment,
    });

    res.json({ message: "Document rejected successfully" });
  } catch (err) {
    console.error("Reject Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ============================================================================
   GET APPROVAL HISTORY FOR VERSION
============================================================================ */
export const getVersionApprovals = async (req, res) => {
  const { versionId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT da.*, u.name AS approved_by_name
      FROM document_approvals da
      LEFT JOIN users u ON da.approved_by = u.id
      WHERE da.version_id = $1
      ORDER BY da.created_at DESC
      `,
      [versionId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get Version Approvals Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================================
   GET APPROVAL HISTORY FOR ENTIRE DOCUMENT
============================================================================ */
export const getDocumentApprovals = async (req, res) => {
  const { documentId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT da.*, u.name AS approved_by_name
      FROM document_approvals da
      LEFT JOIN users u ON da.approved_by = u.id
      WHERE da.document_id = $1
      ORDER BY da.created_at DESC
      `,
      [documentId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get Document Approvals Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
