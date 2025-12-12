
// // backend/controllers/authController.js
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { pool } from "../db.js";

// /* -----------------------------------------------------
//    LOGIN 
// ----------------------------------------------------- */
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("Incoming email:", email);

//   try {
//     const { rows } = await pool.query(
//       "SELECT * FROM users WHERE email = $1 LIMIT 1",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = rows[0];

//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // First login
//     if (user.must_change_password) {
//       return res.json({
//         mustChangePassword: true,
//         userId: user.id,
//         message: "Please set a new password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );


//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* -----------------------------------------------------
//    SET NEW PASSWORD (FIRST LOGIN)
// ----------------------------------------------------- */
// export const setNewPassword = async (req, res) => {
//   const { userId, newPassword } = req.body;

//   if (!userId || !newPassword) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const newHash = await bcrypt.hash(newPassword, 12);

//     await pool.query(
//       `UPDATE users 
//        SET password_hash = $1, must_change_password = false
//        WHERE id = $2`,
//       [newHash, userId]
//     );

//     res.json({ message: "Password updated successfully" });

//   } catch (err) {
//     console.error("SetNewPassword Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* -----------------------------------------------------
//    NORMAL CHANGE PASSWORD (NOT FIRST LOGIN)
// ----------------------------------------------------- */
// export const changePassword = async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const userId = req.user.id;

//   try {
//     const result = await pool.query(
//       "SELECT password_hash FROM users WHERE id = $1",
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const match = await bcrypt.compare(oldPassword, result.rows[0].password_hash);
//     if (!match) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     const newHash = await bcrypt.hash(newPassword, 12);

//     await pool.query(
//       `UPDATE users SET password_hash = $1 WHERE id = $2`,
//       [newHash, userId]
//     );

//     res.json({ message: "Password changed successfully" });

//   } catch (err) {
//     console.error("ChangePassword Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* -----------------------------------------------------
//    SECURE REFRESH TOKEN (PROTECTED + SAFE)
// ----------------------------------------------------- */
// export const refreshToken = async (req, res) => {

//   console.log("🔄 Refresh called by:", req.user?.role, req.user?.email);

//   const oldToken = req.body.token;

//   if (!oldToken) {
//     return res.status(400).json({ message: "Token missing" });
//   }

//   try {
//     // Decode token without checking expiration
//     const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, {
//       ignoreExpiration: true,
//     });

//     // 🔒 SECURITY CHECK — ROLE AND USER MUST MATCH REQUEST USER
//     if (decoded.role !== req.user.role || decoded.id !== req.user.id) {
//       console.log("❌ Token role/user mismatch. Blocking refresh.");
//       return res.status(401).json({ message: "Invalid refresh attempt" });
//     }

//     // 🔄 Issue NEW token with same role & user
//     const newToken = jwt.sign(
//       { id: decoded.id, email: decoded.email, role: decoded.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     console.log("🔄 Token refreshed for:", decoded.email, decoded.role);

//     return res.json({ token: newToken });

//   } catch (err) {
//     console.error("RefreshToken Error:", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


// backend/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

/* -----------------------------------------------------
   LOGIN
----------------------------------------------------- */
export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Incoming email:", email);

  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // First login
    if (user.must_change_password) {
      return res.json({
        mustChangePassword: true,
        userId: user.id,
        message: "Please set a new password",
      });
    }

    // Build token payload including company_id for tenant checks
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id ?? null,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company_id: user.company_id ?? null,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------------------------------
   SET NEW PASSWORD (FIRST LOGIN)
----------------------------------------------------- */
export const setNewPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newHash = await bcrypt.hash(newPassword, 12);

    await pool.query(
      `UPDATE users 
       SET password_hash = $1, must_change_password = false
       WHERE id = $2`,
      [newHash, userId]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("SetNewPassword Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------------------------------
   NORMAL CHANGE PASSWORD (NOT FIRST LOGIN)
----------------------------------------------------- */
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(
      oldPassword,
      result.rows[0].password_hash
    );
    if (!match) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    await pool.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [
      newHash,
      userId,
    ]);

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("ChangePassword Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------------------------------
   SECURE REFRESH TOKEN (PROTECTED + SAFE)
   - preserves company_id from the old token
----------------------------------------------------- */
export const refreshToken = async (req, res) => {
  console.log("🔄 Refresh called by:", req.user?.role, req.user?.email);

  const oldToken = req.body.token;

  if (!oldToken) {
    return res.status(400).json({ message: "Token missing" });
  }

  try {
    // Decode token without checking expiration
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });

    // SECURITY CHECK — ROLE AND USER MUST MATCH REQUEST USER
    if (decoded.role !== req.user.role || decoded.id !== req.user.id) {
      console.log("❌ Token role/user mismatch. Blocking refresh.");
      return res.status(401).json({ message: "Invalid refresh attempt" });
    }

    // Preserve company_id when issuing new token
    const newPayload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      company_id: decoded.company_id ?? null,
    };

    const newToken = jwt.sign(newPayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("🔄 Token refreshed for:", decoded.email, decoded.role);

    return res.json({ token: newToken });
  } catch (err) {
    console.error("RefreshToken Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
