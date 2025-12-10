// // C:\Users\hp\Desktop\project_management\backend\server.js

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import { pool } from "./db.js";

// dotenv.config();

// // Log database connection
// pool.query("SELECT current_database()", (err, result) => {
//   console.log("Connected to DB:", result?.rows[0]?.current_database);
// });

// // Routes
// import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import documentRoutes from "./routes/documents.js";
// import projectRoutes from "./routes/projects.js";
// import folderRoutes from "./routes/folders.js";
// import dashboardRoutes from "./routes/dashboard.js";   // ⭐ ADDED
// import approvalsRoutes from "./routes/approvals.js";
// import commentsRoutes from "./routes/comments.js";

// const app = express();

// // -------------------------------
// // CORS
// // -------------------------------
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

// // Body parsing
// app.use(express.json({ limit: "30mb" }));
// app.use(express.urlencoded({ extended: true }));

// // -------------------------------
// // Serve uploaded files
// // -------------------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );

// // -------------------------------
// // API Routes
// // -------------------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/dashboard", dashboardRoutes);   // ⭐ ADDED
// app.use("/api/approvals", approvalsRoutes);
// app.use("/api/documents", commentsRoutes);

// // Health check
// app.get("/", (req, res) => {
//   res.send("Project Management Backend Running...");
// });

// // -------------------------------
// // Start Server
// // -------------------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// // C:\Users\hp\Desktop\project_management\backend\server.js

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import http from "http";
// import { Server } from "socket.io";
// import { pool } from "./db.js";

// dotenv.config();

// // ----------------------------
// // Log database connection
// // ----------------------------
// pool.query("SELECT current_database()", (err, result) => {
//   console.log("Connected to DB:", result?.rows[0]?.current_database);
// });

// // ----------------------------
// // Import Routes
// // ----------------------------
// import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import documentRoutes from "./routes/documents.js";
// import projectRoutes from "./routes/projects.js";
// import folderRoutes from "./routes/folders.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import approvalsRoutes from "./routes/approvals.js";
// import commentsRoutes from "./routes/comments.js";

// const app = express();

// // ----------------------------
// // Create HTTP server
// // ----------------------------
// const server = http.createServer(app);

// // ----------------------------
// // FIXED: Proper Socket.IO CORS
// // ----------------------------
// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",     // ❗ Frontend URL
//     methods: ["GET", "POST"],
//     credentials: true
//   },
// });

// // ----------------------------
// // SOCKET.IO EVENTS
// // ----------------------------
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   // Join room
//   socket.on("join_document", (documentId) => {
//     socket.join(`document_${documentId}`);
//   });

//   // Leave room
//   socket.on("leave_document", (documentId) => {
//     socket.leave(`document_${documentId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // ----------------------------
// // FIXED: Proper Express CORS
// // ----------------------------
// app.use(
//   cors({
//     origin: "http://localhost:5173",    // ❗ Must be specific origin
//     credentials: true,
//   })
// );

// // Body parsing
// app.use(express.json({ limit: "30mb" }));
// app.use(express.urlencoded({ extended: true }));

// // ----------------------------
// // File Serving
// // ----------------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ----------------------------
// // API Routes
// // ----------------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/approvals", approvalsRoutes);
// app.use("/api/documents", commentsRoutes);

// // Health check
// app.get("/", (req, res) => {
//   res.send("Project Management Backend Running...");
// });

// // ----------------------------
// // Start Server (Express + IO)
// // ----------------------------
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running with Socket.IO on port ${PORT}`);
// });


// C:\Users\hp\Desktop\project_management\backend\server.js

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import http from "http";
// import { Server } from "socket.io";
// import { pool } from "./db.js";

// dotenv.config();

// // ----------------------------------
// // DB Connection Logging
// // ----------------------------------
// pool.query("SELECT current_database()", (err, result) => {
//   console.log("Connected to DB:", result?.rows[0]?.current_database);
// });

// // ----------------------------------
// // Import Routes
// // ----------------------------------
// import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import documentRoutes from "./routes/documents.js";
// import projectRoutes from "./routes/projects.js";
// import folderRoutes from "./routes/folders.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import approvalsRoutes from "./routes/approvals.js";
// import commentsRoutes from "./routes/comments.js";

// const app = express();

// // ----------------------------------
// // HTTP Server + Socket.IO
// // ----------------------------------
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // frontend
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ----------------------------------
// // REAL-TIME SOCKET EVENTS
// // ----------------------------------
// io.on("connection", (socket) => {
//   console.log("🌐 Client connected:", socket.id);

//   // Store active document per socket
//   socket.activeDocument = null;

//   // ---------- JOIN DOCUMENT ----------
//   socket.on("join_document", ({ documentId, userId, name, role }) => {
//     const room = `document_${documentId}`;
//     socket.join(room);
//     socket.activeDocument = documentId;

//     // Broadcast presence to others
//     socket.to(room).emit("user_joined", {
//       documentId,
//       userId,
//       name,
//       role,
//     });
//   });

//   // ---------- LEAVE DOCUMENT ----------
//   socket.on("leave_document", ({ documentId, userId }) => {
//     const room = `document_${documentId}`;
//     socket.leave(room);

//     socket.to(room).emit("user_left", {
//       documentId,
//       userId,
//     });
//   });

//   // ---------- TYPING INDICATOR ----------
//   socket.on("typing", ({ documentId, userId, name }) => {
//     const room = `document_${documentId}`;
//     socket.to(room).emit("typing", { documentId, userId, name });
//   });

//   // Not mandatory, but kept for symmetry
//   socket.on("stop_typing", ({ documentId, userId }) => {
//     const room = `document_${documentId}`;
//     socket.to(room).emit("stop_typing", { documentId, userId });
//   });

//   // ---------- MESSAGE DELIVERED ----------
//   socket.on("message_delivered", ({ documentId, messageId, from }) => {
//     const room = `document_${documentId}`;
//     socket.to(room).emit("message_delivered", {
//       documentId,
//       messageId,
//       from,
//     });
//   });

//   // ---------- MESSAGE SEEN ----------
//   socket.on("message_seen", ({ documentId, messageId, userId }) => {
//     const room = `document_${documentId}`;
//     socket.to(room).emit("message_seen", {
//       documentId,
//       messageId,
//       userId,
//     });
//   });

//   // ---------- FOR SAFETY ----------
//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// // ----------------------------------
// // EXPRESS CORS
// // ----------------------------------
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // Body parsing
// app.use(express.json({ limit: "30mb" }));
// app.use(express.urlencoded({ extended: true }));

// // ----------------------------------
// // Static Files
// // ----------------------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ----------------------------------
// // API Routes
// // ----------------------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/approvals", approvalsRoutes);
// app.use("/api/documents", commentsRoutes);

// // ----------------------------------
// // Health Check
// // ----------------------------------
// app.get("/", (req, res) => {
//   res.send("Project Management Backend Running with Real-Time Features...");
// });

// // ----------------------------------
// // Start Server
// // ----------------------------------
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running with FULL Socket.IO on port ${PORT}`);
// });


// // C:\Users\hp\Desktop\project_management\backend\server.js

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import http from "http";
// import { Server } from "socket.io";
// import { pool } from "./db.js";
// import cookieParser from "cookie-parser";           // <-- FIXED: imported correctly
// import { registerSocketHandlers } from "./socketHandlers.js"; // socket handlers

// dotenv.config();

// // -------------------------------
// // Log DB Connection
// // -------------------------------
// pool.query("SELECT current_database()", (err, result) => {
//   console.log("Connected to DB:", result?.rows[0]?.current_database);
// });

// // -------------------------------
// // Create Express App
// // -------------------------------
// const app = express();

// // -------------------------------
// // Cookie Parser (REQUIRED FOR AUTH)
// // -------------------------------
// app.use(cookieParser());   // <-- FIXED: NOW app exists

// // -------------------------------
// // Create HTTP + Socket.IO Server
// // -------------------------------
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   },
// });

// // Register all socket handlers
// registerSocketHandlers(io);

// // -------------------------------
// // CORS
// // -------------------------------
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );

// // Body parser
// app.use(express.json({ limit: "30mb" }));
// app.use(express.urlencoded({ extended: true }));

// // -------------------------------
// // Static File Serving
// // -------------------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // -------------------------------
// // Routes
// // -------------------------------
// import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import documentRoutes from "./routes/documents.js";
// import projectRoutes from "./routes/projects.js";
// import folderRoutes from "./routes/folders.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import approvalsRoutes from "./routes/approvals.js";
// import commentsRoutes from "./routes/comments.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/approvals", approvalsRoutes);
// app.use("/api/documents", commentsRoutes);

// // -------------------------------
// // Health Check
// // -------------------------------
// app.get("/", (req, res) => {
//   res.send("Project Management Backend Running with Real-Time Features...");
// });

// // -------------------------------
// // Start Server
// // -------------------------------
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running with FULL Socket.IO on port ${PORT}`);
// });


// C:\Users\hp\Desktop\project_management\backend\server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { pool } from "./db.js";
import cookieParser from "cookie-parser";
import { registerSocketHandlers } from "./socketHandlers.js";

dotenv.config();

/* ============================================================
   DATABASE CONNECTION LOG
============================================================ */
pool.query("SELECT current_database()", (err, result) => {
  console.log("Connected to DB:", result?.rows[0]?.current_database);
});

/* ============================================================
   EXPRESS APP
============================================================ */
const app = express();

/* ============================================================
   COOKIE PARSER (REQUIRED FOR AUTH)
============================================================ */
app.use(cookieParser());

/* ============================================================
   HTTP SERVER + SOCKET.IO SERVER
============================================================ */
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// Register all socket listeners
registerSocketHandlers(io);

/* ============================================================
   CORS
============================================================ */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

/* ============================================================
   BODY PARSER
============================================================ */
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

/* ============================================================
   STATIC FILES (UPLOADS)
============================================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ============================================================
   ROUTES
============================================================ */
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import documentRoutes from "./routes/documents.js";
import projectRoutes from "./routes/projects.js";
import folderRoutes from "./routes/folders.js";
import dashboardRoutes from "./routes/dashboard.js";
import approvalsRoutes from "./routes/approvals.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/documents", documentRoutes);    // includes comments inside documents.js
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/approvals", approvalsRoutes);

/* ============================================================
   HEALTH CHECK
============================================================ */
app.get("/", (req, res) => {
  res.send("Project Management Backend Running with Real-Time Features...");
});

/* ============================================================
   404 HANDLER (Optional)
============================================================ */
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

/* ============================================================
   START SERVER
============================================================ */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running with FULL Socket.IO on port ${PORT}`);
});
