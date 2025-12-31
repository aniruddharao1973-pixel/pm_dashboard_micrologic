// backend/controllers/adminController.js

import bcrypt from "bcrypt";
import crypto from "crypto";
import { pool } from "../db.js";
import { sendCustomerCredentials } from "../utils/mailService.js";
import { insertEmailLog, getEmailLogs } from "../models/emailLogModel.js";
import { seedDefaultFolders } from "../services/folderSeeder.js";

/* ---------------------------------------------------
   1️⃣ Create Customer (Admin / TechSales Only) — FINAL
--------------------------------------------------- */
export const createCustomer = async (req, res) => {
  const {
    name,
    email,
    externalId,
    location,
    contactPerson,
    contactPhone,
    registerDate,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = contactPhone?.replace(/\s+/g, "");

    /* 1️⃣ Admin Email */
    const adminExists = await client.query(
      "SELECT 1 FROM users WHERE email = $1 LIMIT 1",
      [normalizedEmail]
    );
    if (adminExists.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({ message: "Admin email already exists" });
    }

    /* 2️⃣ Company Name */
    const nameExists = await client.query(
      "SELECT 1 FROM companies WHERE lower(name) = lower($1) LIMIT 1",
      [name]
    );
    if (nameExists.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({ message: "Company name already exists" });
    }

    /* 3️⃣ Customer ID */
    if (externalId) {
      const extExists = await client.query(
        "SELECT 1 FROM companies WHERE external_id = $1 LIMIT 1",
        [externalId]
      );
      if (extExists.rows.length > 0) {
        await client.query("ROLLBACK");
        return res.status(409).json({ message: "Customer ID already exists" });
      }
    }

    /* 4️⃣ Phone */
    if (normalizedPhone) {
      const phoneExists = await client.query(
        "SELECT 1 FROM companies WHERE contact_phone = $1 LIMIT 1",
        [normalizedPhone]
      );
      if (phoneExists.rows.length > 0) {
        await client.query("ROLLBACK");
        return res.status(409).json({ message: "Phone number already exists" });
      }
    }

    /* 5️⃣ Create Company */
    const companyRes = await client.query(
      `INSERT INTO companies
       (name, external_id, location, contact_person, contact_phone, register_date, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id`,
      [
        name,
        externalId || null,
        location || null,
        contactPerson || null,
        normalizedPhone || null,
        registerDate || null,
        req.user.id,
      ]
    );

    const companyId = companyRes.rows[0].id;

    /* 6️⃣ Create Admin User */
    const tempPassword = crypto.randomBytes(6).toString("hex");
    const hash = await bcrypt.hash(tempPassword, 12);

    const adminRes = await client.query(
      `INSERT INTO users (name, email, password_hash, role, must_change_password)
       VALUES ($1,$2,$3,'customer',true)
       RETURNING id, name, email`,
      [name, normalizedEmail, hash]
    );

    const adminUser = adminRes.rows[0];

    await client.query(
      `INSERT INTO user_companies (user_id, company_id)
       VALUES ($1,$2)`,
      [adminUser.id, companyId]
    );

    await client.query("COMMIT");

    /* 7️⃣ Send Email (background) */
    Promise.resolve().then(async () => {
      try {
        await sendCustomerCredentials({
          toEmail: adminUser.email,
          name: adminUser.name,
          tempPassword,
        });
      } catch (e) {
        console.error("Email send failed:", e);
      }
    });

    return res.status(201).json({
      message: "Customer created successfully",
      companyId,
      adminUser,
    });
  } catch (err) {
    await client.query("ROLLBACK");

    if (err.code === "23505") {
      return res.status(409).json({ message: "Duplicate value detected" });
    }

    console.error("CreateCustomer ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

/* ---------------------------------------------------
   1.5️⃣ Resend Credentials
--------------------------------------------------- */
export const resendCredentials = async (req, res) => {
  const { customerId } = req.params;

  try {
    // Fetch customer
    const result = await pool.query(
      `SELECT id, name, email FROM users
       WHERE id = $1 AND role = 'customer' LIMIT 1`,
      [customerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customer = result.rows[0];

    // Generate new temp password
    const tempPassword = crypto.randomBytes(6).toString("hex");
    const hashed = await bcrypt.hash(tempPassword, 12);

    await pool.query(
      `UPDATE users SET password_hash = $1, must_change_password = true WHERE id = $2`,
      [hashed, customerId]
    );

    /* ---------------------------------------------------
   SEND RESEND EMAIL (NON-BLOCKING)
--------------------------------------------------- */
    Promise.resolve().then(async () => {
      try {
        console.log("📧 Sending resend credentials email in background...");
        const emailResp = await sendCustomerCredentials({
          toEmail: customer.email,
          name: customer.name,
          tempPassword,
        });

        await insertEmailLog({
          customer_id: customer.id,
          email: customer.email,
          temporary_password: tempPassword,
          subject: "Your PM Dashboard Login Credentials (Resent)",
          body: JSON.stringify(emailResp),
          status: "sent",
          error: null,
        });
      } catch (emailErr) {
        console.error("❌ Background resend email failed:", emailErr);

        await insertEmailLog({
          customer_id: customer.id,
          email: customer.email,
          temporary_password: tempPassword,
          subject: "Your PM Dashboard Login Credentials (Resent)",
          body: null,
          status: "error",
          error: emailErr.message || JSON.stringify(emailErr),
        });
      }
    });

    res.json({
      message: "Credentials resent successfully",
      customerId,
      temporaryPassword: tempPassword,
      emailSent: true,
    });
  } catch (err) {
    console.error("ResendCredentials Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   1.6️⃣ Fetch Email Logs
--------------------------------------------------- */
export const fetchEmailLogs = async (req, res) => {
  try {
    const logs = await getEmailLogs(200);
    res.json(logs);
  } catch (err) {
    console.error("FetchEmailLogs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   2️⃣ Create Project (Admin Only) — FIXED FOR COMPANIES
--------------------------------------------------- */

/* ---------------------------------------------------
   2️⃣ Create Project (Admin Only) — USE SEEDER
--------------------------------------------------- */
export const createProject = async (req, res) => {
  const { name, customerId } = req.body; // customerId = companyId

  if (!name || !customerId) {
    return res
      .status(400)
      .json({ message: "Project name and companyId required" });
  }

  console.log("\n🔥 ADMIN CREATE PROJECT (SEEDER) 🔥");
  console.log("Incoming:", { name, companyId: customerId });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Validate company
    const comp = await client.query("SELECT id FROM companies WHERE id = $1", [
      customerId,
    ]);

    if (comp.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Company not found" });
    }

    // 2️⃣ Create project
    const projectRes = await client.query(
      `
      INSERT INTO projects (name, company_id, created_by)
      VALUES ($1, $2, $3)
      RETURNING id, name, company_id, created_by, created_at
      `,
      [name, customerId, req.user.id]
    );

    const project = projectRes.rows[0];
    console.log("✔ Project created:", project.id);

    // 3️⃣ 🔥 AUTO SEED ROOT + SUBFOLDERS
    await seedDefaultFolders(project.id, client);

    await client.query("COMMIT");

    res.status(201).json({
      message: "Project created with default folders",
      project,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Admin CreateProject Error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

/* ---------------------------------------------------
   3️⃣ Admin: Create Folder Inside Project
--------------------------------------------------- */
// export const createFolder = async (req, res) => {
//   const { projectId, folderName } = req.body;

//   if (!folderName || !projectId) {
//     return res
//       .status(400)
//       .json({ message: "Folder name & projectId required" });
//   }

//   try {
//     const exists = await pool.query("SELECT id FROM projects WHERE id = $1", [
//       projectId,
//     ]);

//     if (exists.rows.length === 0) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     const result = await pool.query(
//       `INSERT INTO folders (project_id, name)
//        VALUES ($1, $2)
//        RETURNING id, name, created_at`,
//       [projectId, folderName]
//     );

//     res.json({
//       message: "Folder created successfully",
//       folder: result.rows[0],
//     });
//   } catch (err) {
//     console.error("CreateFolder Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

/* ---------------------------------------------------
   4️⃣ Get All Projects (Admin)
--------------------------------------------------- */
export const getProjects = async (req, res) => {
  try {
    const out = await pool.query(
      `SELECT
         p.*,
         c.name AS company_name
       FROM projects p
       LEFT JOIN companies c ON c.id = p.company_id
       ORDER BY p.created_at DESC`
    );

    res.json(out.rows);
  } catch (err) {
    console.error("GetProjects Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   5️⃣ Get All Customers (Grouped by Company)
--------------------------------------------------- */
export const getCustomers = async (req, res) => {
  console.log("\n=== Fetching Grouped Customers ===");

  try {
    const query = `
      SELECT
        c.id AS company_id,
        c.name AS company_name,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.created_at AS user_created_at
      FROM companies c
      JOIN user_companies uc ON uc.company_id = c.id
      JOIN users u ON u.id = uc.user_id
      WHERE u.role = 'customer'
      ORDER BY c.name ASC, u.created_at DESC
    `;

    console.log("Running grouped customer query...");

    const result = await pool.query(query);
    console.log("Raw DB rows:", result.rows);

    const grouped = {};
    for (const row of result.rows) {
      if (!grouped[row.company_id]) {
        grouped[row.company_id] = {
          company_id: row.company_id,
          company_name: row.company_name,
          users: [],
        };
      }

      grouped[row.company_id].users.push({
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
        created_at: row.user_created_at,
      });
    }

    const finalOutput = Object.values(grouped);

    console.log("Grouped Output:", finalOutput);

    res.json(finalOutput);
  } catch (err) {
    console.error("GetCustomers Grouped Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   6️⃣ Get Company Profile (Company + Users + Projects)
--------------------------------------------------- */
export const getCompanyProfile = async (req, res) => {
  const { companyId } = req.params;

  console.log("=== Fetching Company Profile ===");
  console.log("Requested companyId:", companyId);

  try {
    // 1️⃣ Fetch company
    const companyRes = await pool.query(
      `SELECT * FROM companies WHERE id = $1 LIMIT 1`,
      [companyId]
    );

    if (companyRes.rows.length === 0) {
      console.log("❌ Company not found");
      return res.status(404).json({ message: "Company not found" });
    }

    const company = companyRes.rows[0];

    // 2️⃣ Fetch all users of this company
    const usersRes = await pool.query(
      `SELECT u.id, u.name, u.email, u.created_at
       FROM user_companies uc
       JOIN users u ON u.id = uc.user_id
       WHERE uc.company_id = $1`,
      [companyId]
    );

    // 3️⃣ Fetch all projects of this company
    const projectsRes = await pool.query(
      `SELECT id, name, status, created_at
       FROM projects
       WHERE company_id = $1
       ORDER BY created_at DESC`,
      [companyId]
    );

    console.log("✔ Company Profile Loaded");

    res.json({
      company,
      users: usersRes.rows,
      projects: projectsRes.rows,
    });
  } catch (err) {
    console.error("GetCompanyProfile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   6️⃣ View Single Customer + Their Projects
--------------------------------------------------- */
/* ---------------------------------------------------
   6️⃣ View Single Customer + Their Projects
--------------------------------------------------- */
export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    // 1️⃣ Fetch the user
    const userRes = await pool.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE id = $1 AND role = 'customer'
       LIMIT 1`,
      [customerId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customer = userRes.rows[0];

    // 2️⃣ Get company of this user
    const compRes = await pool.query(
      `SELECT company_id
       FROM user_companies
       WHERE user_id = $1
       LIMIT 1`,
      [customerId]
    );

    if (compRes.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Company not found for this customer" });
    }

    const companyId = compRes.rows[0].company_id;

    // 3️⃣ Fetch projects for that company
    const projectsRes = await pool.query(
      `SELECT id, name, status, created_at
       FROM projects
       WHERE company_id = $1
       ORDER BY created_at DESC`,
      [companyId]
    );

    res.json({
      customer,
      companyId,
      projects: projectsRes.rows,
    });
  } catch (err) {
    console.error("GetCustomerById Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// /* ---------------------------------------------------
//    7️⃣ Delete Customer
// --------------------------------------------------- */
// export const deleteCustomer = async (req, res) => {
//   const { customerId } = req.params;

//   try {
//     const result = await pool.query(
//       "DELETE FROM users WHERE id = $1 AND role = 'customer' RETURNING id",
//       [customerId]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     res.json({ message: "Customer deleted successfully" });

//   } catch (err) {
//     console.error("DeleteCustomer Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

/* ---------------------------------------------------
   Delete Entire Company + All Users, Projects, Folders, Documents
--------------------------------------------------- */
export const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  console.log("🟡 DELETE COMPANY CALLED → companyId =", companyId);

  try {
    // 1️⃣ Fetch all users under this company
    console.log("🔍 Fetching users for company...");
    const userRes = await pool.query(
      `SELECT user_id FROM user_companies WHERE company_id = $1`,
      [companyId]
    );

    const userIds = userRes.rows.map((u) => u.user_id);
    console.log("📌 Users found:", userIds);

    // 2️⃣ Fetch all project IDs
    console.log("🔍 Fetching projects under company...");
    const projectRes = await pool.query(
      `SELECT id FROM projects WHERE company_id = $1`,
      [companyId]
    );

    const projectIds = projectRes.rows.map((p) => p.id);
    console.log("📌 Projects found:", projectIds);

    // 3️⃣ Delete documents & folders & projects
    if (projectIds.length > 0) {
      console.log("🗑 Deleting documents...");
      await pool.query(
        `DELETE FROM documents
         WHERE folder_id IN (
           SELECT id FROM folders WHERE project_id = ANY($1)
         )`,
        [projectIds]
      );

      console.log("🗑 Deleting folders...");
      await pool.query(`DELETE FROM folders WHERE project_id = ANY($1)`, [
        projectIds,
      ]);

      console.log("🗑 Deleting projects...");
      await pool.query(`DELETE FROM projects WHERE id = ANY($1)`, [projectIds]);
    }

    // 4️⃣ Delete ALL users (customer)
    if (userIds.length > 0) {
      console.log("🗑 Deleting ALL users under this company...");
      await pool.query(
        `DELETE FROM users
         WHERE id = ANY($1)`,
        [userIds]
      );
    }

    // 5️⃣ Delete company record
    console.log("🗑 Deleting company...");
    await pool.query(
      `DELETE FROM companies
       WHERE id = $1`,
      [companyId]
    );

    console.log("✅ COMPANY DELETED SUCCESSFULLY");

    res.json({
      message:
        "Company, all users, projects, folders, and documents deleted successfully",
    });
  } catch (err) {
    console.error("❌ deleteCompany Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   9️⃣ Update Company Profile (Admin Only) — FINAL
--------------------------------------------------- */
export const updateCustomerProfile = async (req, res) => {
  const { companyId } = req.params;
  const {
    name,
    externalId,
    email,
    location,
    contactPerson,
    contactEmail,
    contactPhone,
    registerDate,
  } = req.body;

  // 🔍 Fetch current admin user (email + id)
  const adminRes = await pool.query(
    `
  SELECT u.id, u.email, u.name
  FROM users u
  JOIN user_companies uc ON uc.user_id = u.id
  WHERE uc.company_id = $1
  LIMIT 1
  `,
    [companyId]
  );

  if (adminRes.rows.length === 0) {
    return res.status(404).json({ message: "Admin user not found" });
  }

  const adminUser = adminRes.rows[0];
  const oldEmail = adminUser.email;

  try {
    const comp = await pool.query(
      "SELECT id FROM companies WHERE id = $1 LIMIT 1",
      [companyId]
    );

    if (comp.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    /* Uniqueness checks */
    if (name) {
      const exists = await pool.query(
        "SELECT 1 FROM companies WHERE lower(name)=lower($1) AND id<>$2",
        [name, companyId]
      );
      if (exists.rows.length > 0) {
        return res.status(409).json({ message: "Company name already exists" });
      }
    }

    if (externalId) {
      const exists = await pool.query(
        "SELECT 1 FROM companies WHERE external_id=$1 AND id<>$2",
        [externalId, companyId]
      );
      if (exists.rows.length > 0) {
        return res.status(409).json({ message: "Customer ID already exists" });
      }
    }

    if (contactPhone) {
      const exists = await pool.query(
        "SELECT 1 FROM companies WHERE contact_phone=$1 AND id<>$2",
        [contactPhone.replace(/\s+/g, ""), companyId]
      );
      if (exists.rows.length > 0) {
        return res.status(409).json({ message: "Phone number already exists" });
      }
    }

    if (email) {
      const emailExists = await pool.query(
        `
    SELECT 1 FROM users
    WHERE lower(email) = lower($1)
      AND id NOT IN (
        SELECT user_id FROM user_companies WHERE company_id = $2
      )
    LIMIT 1
    `,
        [email.trim(), companyId]
      );

      if (emailExists.rows.length > 0) {
        return res.status(409).json({ message: "Admin email already exists" });
      }
    }

    const updated = await pool.query(
      `UPDATE companies
       SET
         name = COALESCE($1, name),
         external_id = COALESCE($2, external_id),
         location = COALESCE($3, location),
         contact_person = COALESCE($4, contact_person),
         contact_email = COALESCE($5, contact_email),
         contact_phone = COALESCE($6, contact_phone),
         register_date = COALESCE($7, register_date)
       WHERE id = $8
       RETURNING *`,
      [
        name,
        externalId,
        location,
        contactPerson,
        contactEmail,
        contactPhone?.replace(/\s+/g, ""),
        registerDate,
        companyId,
      ]
    );

    if (email && email.trim().toLowerCase() !== oldEmail) {
      const newEmail = email.trim().toLowerCase();

      await pool.query(
        `
    UPDATE users
    SET
      email = $1,
      password_reset_token = NULL,
      password_reset_expires = NULL
    WHERE id = $2
    `,
        [newEmail, adminUser.id]
      );
    }

    res.json({
      message: "Company profile updated successfully",
      company: updated.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Duplicate value detected" });
    }

    console.error("UpdateCustomerProfile ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   Delete Single Project (Admin Only)
--------------------------------------------------- */
export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  console.log("🗑 Deleting Project:", projectId);

  try {
    // 1️⃣ Check if project exists
    const projectCheck = await pool.query(
      "SELECT id FROM projects WHERE id = $1 LIMIT 1",
      [projectId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2️⃣ Delete all documents inside folders of this project
    await pool.query(
      `DELETE FROM documents
       WHERE folder_id IN (SELECT id FROM folders WHERE project_id = $1)`,
      [projectId]
    );

    // 3️⃣ Delete folders
    await pool.query(`DELETE FROM folders WHERE project_id = $1`, [projectId]);

    // 4️⃣ Delete project
    await pool.query(`DELETE FROM projects WHERE id = $1`, [projectId]);

    console.log("✅ Project deleted successfully");

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("❌ deleteProject Error", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------------------
   🔎 LIVE DUPLICATE CHECK (CREATE + EDIT)
--------------------------------------------------- */

/**
 * type: email | phone | externalId | companyName
 * value: string
 * companyId: optional (used in edit to exclude self)
 */
export const validateDuplicate = async (req, res) => {
  const { type, value, companyId } = req.query;

  if (!type || !value) {
    return res.status(400).json({ exists: false });
  }

  try {
    let query = "";
    let params = [];

    switch (type) {
      case "email":
        query = `
          SELECT 1 FROM users
          WHERE lower(email) = lower($1)
          LIMIT 1
        `;
        params = [value.trim()];
        break;

      case "companyName":
        query = `
          SELECT 1 FROM companies
          WHERE lower(name) = lower($1)
          ${companyId ? "AND id <> $2" : ""}
          LIMIT 1
        `;
        params = companyId ? [value.trim(), companyId] : [value.trim()];
        break;

      case "externalId":
        query = `
          SELECT 1 FROM companies
          WHERE external_id = $1
          ${companyId ? "AND id <> $2" : ""}
          LIMIT 1
        `;
        params = companyId ? [value.trim(), companyId] : [value.trim()];
        break;

      case "phone":
        query = `
          SELECT 1 FROM companies
          WHERE contact_phone = $1
          ${companyId ? "AND id <> $2" : ""}
          LIMIT 1
        `;
        params = companyId
          ? [value.replace(/\s+/g, ""), companyId]
          : [value.replace(/\s+/g, "")];
        break;

      default:
        return res.status(400).json({ exists: false });
    }

    const result = await pool.query(query, params);

    return res.json({
      exists: result.rows.length > 0,
    });
  } catch (err) {
    console.error("Live duplicate check error:", err);
    return res.status(500).json({ exists: false });
  }
};

/* ---------------------------------------------------
   8️⃣ Get Customer (Edit Modal)
--------------------------------------------------- */
export const getCustomer = async (req, res) => {
  const { companyId } = req.params;

  try {
    const result = await pool.query(
      `
  SELECT
    c.*,
    u.email AS admin_email
  FROM companies c
  JOIN user_companies uc ON uc.company_id = c.id
  JOIN users u ON u.id = uc.user_id AND u.role = 'customer'
  WHERE c.id = $1
  LIMIT 1
  `,
      [companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      company: result.rows[0],
    });
  } catch (err) {
    console.error("GetCustomer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
