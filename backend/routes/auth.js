// import express from "express";
// import { 
//   login, 
//   changePassword, 
//   setNewPassword 
// } from "../controllers/authController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Login (admin + customer)
// router.post("/login", login);

// // First-time password setup (NO TOKEN REQUIRED)
// router.post("/set-new-password", setNewPassword);

// // Regular password change (requires login + token)
// router.post("/change-password", authMiddleware, changePassword);

// export default router;



// backend/routes/auth.js

import express from "express";
import { 
  login, 
  changePassword, 
  setNewPassword,
  refreshToken
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login (admin + customer)
router.post("/login", login);

// First-time password setup (NO TOKEN REQUIRED)
router.post("/set-new-password", setNewPassword);

// Regular password change (requires login + token)
router.post("/change-password", authMiddleware, changePassword);

// ⭐ NEW — Auto Refresh Token
router.post("/refresh", authMiddleware, refreshToken);


export default router;
