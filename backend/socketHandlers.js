// backend/socketHandlers.js

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    /*
     * JOIN DOCUMENT ROOM
     */
    socket.on("join_document", ({ documentId, userId, name, role }) => {
      const room = `document_${documentId}`;
      socket.join(room);

      // Broadcast presence
      socket.to(room).emit("user_joined", {
        documentId,
        userId,
        name,
        role,
      });

      console.log(`👥 ${name} joined room ${room}`);
    });

    /*
     * LEAVE DOCUMENT ROOM
     */
    socket.on("leave_document", ({ documentId, userId }) => {
      const room = `document_${documentId}`;
      socket.leave(room);

      socket.to(room).emit("user_left", { documentId, userId });

      console.log(`👤 User ${userId} left room ${room}`);
    });

    /*
     * TYPING
     */
    socket.on("typing", ({ documentId, userId, name }) => {
      const room = `document_${documentId}`;
      socket.to(room).emit("typing", { documentId, userId, name });
    });

    /*
     * STOP TYPING
     */
    socket.on("stop_typing", ({ documentId, userId }) => {
      const room = `document_${documentId}`;
      socket.to(room).emit("stop_typing", { documentId, userId });
    });

    /*
     * COMMENT DELIVERED
     */
    socket.on("message_delivered", ({ documentId, messageId, from }) => {
      const room = `document_${documentId}`;
      socket.to(room).emit("message_delivered", {
        documentId,
        messageId,
        from,
      });
    });

    /*
     * COMMENT SEEN
     */
    socket.on("message_seen", ({ documentId, messageId, userId }) => {
      const room = `document_${documentId}`;
      socket.to(room).emit("message_seen", {
        documentId,
        messageId,
        userId,
      });
    });

    /*
     * APPROVAL ACTION
     */
    socket.on("approval_action", ({ documentId, approvalId, action, by }) => {
      const room = `document_${documentId}`;

      io.to(room).emit("approval_updated", {
        documentId,
        approvalId,
        action,
        by,
        timestamp: new Date().toISOString(),
      });

      console.log(`📄 Approval update: ${action} by ${by}`);
    });

    /*
     * DISCONNECT
     */
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}
