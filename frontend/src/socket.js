// // src/socket.js
// import { io } from "socket.io-client";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export const socket = io(API_URL, {
//   autoConnect: false,
//   withCredentials: true,
// });

// /**
//  * Join a document room
//  */
// export function joinDocumentRoom(documentId, user) {
//   if (!socket.connected) {
//     socket.connect();
//   }

//   socket.emit("join_document", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//     role: user?.role,
//   });
// }

// /**
//  * Leave document room
//  */
// export function leaveDocumentRoom(documentId, user) {
//   if (socket.connected) {
//     socket.emit("leave_document", {
//       documentId,
//       userId: user?.id,
//     });
//   }
// }

// /**
//  * Typing indicator
//  */
// export function sendTyping(documentId, user) {
//   socket.emit("typing", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//   });
// }

// /**
//  * Stop typing
//  */
// export function stopTyping(documentId, user) {
//   socket.emit("stop_typing", {
//     documentId,
//     userId: user?.id,
//   });
// }

// /**
//  * Delivered tick ✓
//  */
// export function sendDelivered(documentId, messageId, from) {
//   socket.emit("message_delivered", {
//     documentId,
//     messageId,
//     from,
//   });
// }

// /**
//  * Seen tick ✓✓
//  */
// export function sendSeen(documentId, messageId, user) {
//   socket.emit("message_seen", {
//     documentId,
//     messageId,
//     userId: user?.id,
//   });
// }

// /**
//  * Disconnect completely
//  */
// export function disconnectSocket() {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// }

// export default socket;

// // src/socket.js
// import { io } from "socket.io-client";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // ⛔ Do NOT auto-connect; we will attach token manually
// export const socket = io(API_URL, {
//   autoConnect: false,
//   withCredentials: true,
// });

// /**
//  * Connect socket with latest token
//  */
// export function connectSocket(token) {
//   if (!token) return;

//   // Attach token before connecting
//   socket.auth = { token };

//   if (!socket.connected) {
//     socket.connect();
//   }
// }

// /**
//  * Join a document room
//  */
// export function joinDocumentRoom(documentId, user, token) {
//   if (!socket.connected) {
//     connectSocket(token); // always connect with fresh token
//   }

//   socket.emit("join_document", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//     role: user?.role,
//   });
// }

// /**
//  * Leave document room
//  */
// export function leaveDocumentRoom(documentId, user) {
//   if (socket.connected) {
//     socket.emit("leave_document", {
//       documentId,
//       userId: user?.id,
//     });
//   }
// }

// /**
//  * Typing indicator
//  */
// export function sendTyping(documentId, user) {
//   socket.emit("typing", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//   });
// }

// /**
//  * Stop typing
//  */
// export function stopTyping(documentId, user) {
//   socket.emit("stop_typing", {
//     documentId,
//     userId: user?.id,
//   });
// }

// /**
//  * Delivered ✓ tick
//  */
// export function sendDelivered(documentId, messageId, from) {
//   socket.emit("message_delivered", {
//     documentId,
//     messageId,
//     from,
//   });
// }

// /**
//  * Seen ✓✓ tick
//  */
// export function sendSeen(documentId, messageId, user) {
//   socket.emit("message_seen", {
//     documentId,
//     messageId,
//     userId: user?.id,
//   });
// }

// /**
//  * Disconnect completely
//  */
// export function disconnectSocket() {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// }

// export default socket;



// // src/socket.js
// import { io } from "socket.io-client";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // ⛔ Do NOT auto-connect; token must be attached dynamically
// export const socket = io(API_URL, {
//   autoConnect: false,
//   withCredentials: true,
// });

// /**
//  * Connect socket with latest token
//  */
// export function connectSocket(token) {
//   if (!token) return;

//   socket.auth = { token };

//   if (!socket.connected) {
//     socket.connect();
//   }
// }

// /**
//  * Join document room (for chat + real-time presence)
//  */
// export function joinDocumentRoom(documentId, user, token) {
//   if (!socket.connected) {
//     connectSocket(token);
//   }

//   socket.emit("join_document", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//     role: user?.role,
//   });
// }

// /**
//  * Leave document room
//  */
// export function leaveDocumentRoom(documentId, user) {
//   if (!socket.connected) return;

//   socket.emit("leave_document", {
//     documentId,
//     userId: user?.id,
//   });
// }

// /**
//  * Typing indicator
//  */
// export function sendTyping(documentId, user) {
//   socket.emit("typing", {
//     documentId,
//     userId: user?.id,
//     name: user?.name,
//   });
// }

// /**
//  * Stop typing
//  */
// export function stopTyping(documentId, user) {
//   socket.emit("stop_typing", {
//     documentId,
//     userId: user?.id,
//   });
// }

// /**
//  * Delivered ✓ tick
//  */
// export function sendDelivered(documentId, messageId, from) {
//   socket.emit("message_delivered", {
//     documentId,
//     messageId,
//     from,
//   });
// }

// /**
//  * Seen ✓✓ tick
//  */
// export function sendSeen(documentId, messageId, user) {
//   socket.emit("message_seen", {
//     documentId,
//     messageId,
//     userId: user?.id,
//   });
// }

// /**
//  * Disconnect from socket
//  */
// export function disconnectSocket() {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// }

// export default socket;


// src/socket.js
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Single correct socket initialization
export const socket = io(API_URL, {
  autoConnect: false,
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

/**
 * Connect socket with latest token
 */
export function connectSocket(token) {
  if (!token) return;
  socket.auth = { token };

  if (!socket.connected) {
    socket.connect();
  }
}

/**
 * Join document room
 */
export function joinDocumentRoom(documentId, user, token) {
  if (!socket.connected) {
    connectSocket(token);
  }

  socket.emit("join_document", {
    documentId,
    userId: user?.id,
    name: user?.name,
    role: user?.role,
  });
}

/**
 * Leave document room
 */
export function leaveDocumentRoom(documentId, user) {
  if (!socket.connected) return;

  socket.emit("leave_document", {
    documentId,
    userId: user?.id,
  });
}

/**
 * Typing indicator
 */
export function sendTyping(documentId, user) {
  socket.emit("typing", {
    documentId,
    userId: user?.id,
    name: user?.name,
  });
}

/**
 * Stop typing
 */
export function stopTyping(documentId, user) {
  socket.emit("stop_typing", {
    documentId,
    userId: user?.id,
  });
}

/**
 * Delivered ✓
 */
export function sendDelivered(documentId, messageId, from) {
  socket.emit("message_delivered", {
    documentId,
    messageId,
    from,
  });
}

/**
 * Seen ✓✓
 */
export function sendSeen(documentId, messageId, user) {
  socket.emit("message_seen", {
    documentId,
    messageId,
    userId: user?.id,
  });
}

/**
 * Disconnect socket
 */
export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export default socket;
