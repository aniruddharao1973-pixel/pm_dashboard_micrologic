// import { pool } from "../db.js";

// // ⭐ Admin sees all
// export const getAdminStats = async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const projectCount = await pool.query("SELECT COUNT(*) FROM projects");
//     const documentCount = await pool.query("SELECT COUNT(*) FROM documents");
//     const folderCount = await pool.query("SELECT COUNT(*) FROM folders");

//     res.json({
//       totalProjects: Number(projectCount.rows[0].count),
//       totalDocuments: Number(documentCount.rows[0].count),
//       totalFolders: Number(folderCount.rows[0].count),
//     });
//   } catch (err) {
//     console.error("Admin stats error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // ⭐ Customer sees only THEIR data
// export const getCustomerStats = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const projectCount = await pool.query(
//       `SELECT COUNT(*) FROM projects WHERE customer_id = $1`,
//       [userId]
//     );

//     const folderCount = await pool.query(
//       `SELECT COUNT(*) FROM folders WHERE project_id IN (
//          SELECT id FROM projects WHERE customer_id = $1
//        )`,
//       [userId]
//     );

//     const documentCount = await pool.query(
//       `SELECT COUNT(*) FROM documents WHERE folder_id IN (
//          SELECT id FROM folders WHERE project_id IN (
//            SELECT id FROM projects WHERE customer_id = $1
//          )
//        )`,
//       [userId]
//     );

//     res.json({
//       totalProjects: Number(projectCount.rows[0].count),
//       totalFolders: Number(folderCount.rows[0].count),
//       totalDocuments: Number(documentCount.rows[0].count),
//     });

//   } catch (error) {
//     console.error("Customer Dashboard Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // backend/controllers/dashboardController.js
// import { pool } from "../db.js";

// // ⭐ Admin sees all
// export const getAdminStats = async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const projectCount = await pool.query("SELECT COUNT(*) FROM projects");
//     const documentCount = await pool.query("SELECT COUNT(*) FROM documents");
//     const folderCount = await pool.query("SELECT COUNT(*) FROM folders");
//     const customerCount = await pool.query(
//       "SELECT COUNT(*) FROM users WHERE role = 'customer'"
//     );

//     res.json({
//       totalCustomers: Number(customerCount.rows[0].count),
//       totalProjects: Number(projectCount.rows[0].count),
//       totalDocuments: Number(documentCount.rows[0].count),
//       totalFolders: Number(folderCount.rows[0].count),
//     });

//   } catch (err) {
//     console.error("Admin stats error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // ⭐ Customer sees only THEIR data
// export const getCustomerStats = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const projectCount = await pool.query(
//       `SELECT COUNT(*) FROM projects WHERE customer_id = $1`,
//       [userId]
//     );

//     const folderCount = await pool.query(
//       `SELECT COUNT(*) FROM folders 
//        WHERE project_id IN (
//          SELECT id FROM projects WHERE customer_id = $1
//        )`,
//       [userId]
//     );

//     const documentCount = await pool.query(
//       `SELECT COUNT(*) FROM documents 
//        WHERE folder_id IN (
//          SELECT id FROM folders WHERE project_id IN (
//            SELECT id FROM projects WHERE customer_id = $1
//          )
//        )`,
//       [userId]
//     );

//     res.json({
//       totalProjects: Number(projectCount.rows[0].count),
//       totalFolders: Number(folderCount.rows[0].count),
//       totalDocuments: Number(documentCount.rows[0].count),
//     });

//   } catch (error) {
//     console.error("Customer Dashboard Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




// backend/controllers/dashboardController.js
import { pool } from "../db.js";

/* ============================================================
   ⭐ ADMIN DASHBOARD — See ALL Stats
   Count COMPANY records, not users.
   ============================================================ */
export const getAdminStats = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // ⭐ Count distinct companies = actual customers
    const customerCount = await pool.query(
      "SELECT COUNT(*) FROM companies"
    );

    const projectCount = await pool.query(
      "SELECT COUNT(*) FROM projects"
    );

    const folderCount = await pool.query(
      "SELECT COUNT(*) FROM folders"
    );

    const documentCount = await pool.query(
      "SELECT COUNT(*) FROM documents"
    );

    res.json({
      totalCustomers: Number(customerCount.rows[0].count), // FIXED
      totalProjects: Number(projectCount.rows[0].count),
      totalFolders: Number(folderCount.rows[0].count),
      totalDocuments: Number(documentCount.rows[0].count),
    });

  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ============================================================
   ⭐ CUSTOMER DASHBOARD — Only see their own company data
   ============================================================ */
export const getCustomerStats = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1️⃣ Get user's company
    const companyRes = await pool.query(
      `SELECT company_id 
       FROM user_companies 
       WHERE user_id = $1`,
      [userId]
    );

    if (companyRes.rows.length === 0) {
      return res.json({
        totalProjects: 0,
        totalDocuments: 0
      });
    }

    const companyId = companyRes.rows[0].company_id;

    // 2️⃣ Count projects belonging to the company
    const projectCount = await pool.query(
      `SELECT COUNT(*) 
       FROM projects 
       WHERE company_id = $1`,
      [companyId]
    );

    // 3️⃣ Count documents for all folders of this company
    const documentCount = await pool.query(
      `SELECT COUNT(*) 
       FROM documents 
       WHERE folder_id IN (
         SELECT id FROM folders 
         WHERE project_id IN (
           SELECT id FROM projects WHERE company_id = $1
         )
       )`,
      [companyId]
    );

    res.json({
      totalProjects: Number(projectCount.rows[0].count),
      totalDocuments: Number(documentCount.rows[0].count)
    });

  } catch (error) {
    console.error("Customer Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
