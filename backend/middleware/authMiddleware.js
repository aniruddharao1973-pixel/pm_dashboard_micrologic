// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // => { id, email, role }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// // restrict routes by role
// export const requireRole = (role) => (req, res, next) => {
//   if (req.user.role !== role) {
//     return res.status(403).json({ message: "Access denied" });
//   }
//   next();
// };


// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   const token =
//     req.cookies?.token ||                      // <-- FIX #1 read cookie
//     req.headers.authorization?.split(" ")[1];  // optional fallback

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, email, role }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// // Role-based protection
// export const requireRole = (role) => (req, res, next) => {
//   if (req.user.role !== role) {
//     return res.status(403).json({ message: "Access denied" });
//   }
//   next();
// };


// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Read header OR cookie
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // fallback to cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("✔ Token OK →", decoded);

    next();
  } catch (err) {
    console.log("❌ Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
