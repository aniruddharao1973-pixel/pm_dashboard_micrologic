// // routes/approvals.js
// import express from "express";
// import { startApproval, actOnApproval } from "../controllers/approvalController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/start", authMiddleware, startApproval);
// router.post("/:approvalId/action", authMiddleware, actOnApproval);

// export default router;


// // routes/approvals.js
// import express from "express";
// import { pool } from "../db.js";  // ✅ REQUIRED FIX
// import { startApproval, actOnApproval } from "../controllers/approvalController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Start approval (Admin)
// router.post("/start", authMiddleware, startApproval);

// // Take action on approval (admin/customer)
// router.post("/:approvalId/action", authMiddleware, actOnApproval);

// // -------------------------------------------
// // GET: fetch approval metadata for document
// // -------------------------------------------
// router.get("/document/:documentId", authMiddleware, async (req, res) => {
//   try {
//     const { documentId } = req.params;

//     // 1. Get approval record
//     const approval = await pool.query(
//       `SELECT * FROM approvals 
//        WHERE document_id = $1 
//        ORDER BY created_at DESC 
//        LIMIT 1`,
//       [documentId]
//     );

//   if (approval.rowCount === 0) {
//     // No approval exists yet for this document.
//     // Return 200 with null fields so client can treat this as "no approval" without a console 404.
//     return res.status(200).json({
//       approvalId: null,
//       status: null,
//       currentStepRole: null,
//       message: "No approval found"
//     });
//   }


//     const approvalId = approval.rows[0].id;
//     const status = approval.rows[0].status;

// // 2. Get current step role (who should approve now)
// const step = await pool.query(
//   `SELECT approver_role
//      FROM approval_steps
//     WHERE approval_id = $1
//       AND status = 'pending'
//     ORDER BY id ASC
//     LIMIT 1`,
//   [approvalId]
// );


//     const currentStepRole =
//       step.rowCount > 0 ? step.rows[0].approver_role : null;

//     res.json({
//       approvalId,
//       status,
//       currentStepRole,
//     });
//   } catch (err) {
//     console.error("Error fetching approval metadata", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import * as approvalController from "../controllers/approvalController.js";

// const router = express.Router();

// /* ===== NEW WORKFLOW ===== */
// router.post("/start", authMiddleware, approvalController.startApproval);
// router.post("/:approvalId/action", authMiddleware, approvalController.actOnApproval);
// router.get("/document/:documentId", authMiddleware, approvalController.getApprovalMeta);

// /* ===== OLD WORKFLOW (still supported) ===== */
// router.post("/:versionId/approve", authMiddleware, approvalController.approveDocumentVersion);
// router.post("/:versionId/reject", authMiddleware, approvalController.rejectDocumentVersion);
// router.get("/version/:versionId", authMiddleware, approvalController.getVersionApprovals);

// export default router;


// // routes/approvals.js
// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import * as approvalController from "../controllers/approvalController.js";

// const router = express.Router();

// /* ============================================================
//    SIMPLE APPROVAL WORKFLOW (Approve / Reject with comment)
// ============================================================ */
// router.post(
//   "/:versionId/approve",
//   authMiddleware,
//   approvalController.approveDocumentVersion
// );

// router.post(
//   "/:versionId/reject",
//   authMiddleware,
//   approvalController.rejectDocumentVersion
// );

// /* ============================================================
//    GET approval history
// ============================================================ */
// router.get(
//   "/version/:versionId",
//   authMiddleware,
//   approvalController.getVersionApprovals
// );

// router.get(
//   "/document/:documentId",
//   authMiddleware,
//   approvalController.getDocumentApprovals
// );

// export default router;



// routes/approvals.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import * as approvalController from "../controllers/approvalController.js";

const router = express.Router();

/* ============================================================================
   APPROVE / REJECT (same version – no version increment)
============================================================================ */
router.post(
  "/version/:versionId/approve",
  authMiddleware,
  (req, res) => {
    req.params.versionId = req.params.versionId.trim();
    approvalController.approveDocumentVersion(req, res);
  }
);

router.post(
  "/version/:versionId/reject",
  authMiddleware,
  (req, res) => {
    req.params.versionId = req.params.versionId.trim();
    approvalController.rejectDocumentVersion(req, res);
  }
);

/* ============================================================================
   GET APPROVAL HISTORY (version-level)
============================================================================ */
router.get(
  "/version/:versionId/history",
  authMiddleware,
  (req, res) => {
    req.params.versionId = req.params.versionId.trim();
    approvalController.getVersionApprovals(req, res);
  }
);

/* ============================================================================
   GET APPROVAL HISTORY (document-level)
============================================================================ */
router.get(
  "/document/:documentId/history",
  authMiddleware,
  (req, res) => {
    req.params.documentId = req.params.documentId.trim();
    approvalController.getDocumentApprovals(req, res);
  }
);

export default router;

