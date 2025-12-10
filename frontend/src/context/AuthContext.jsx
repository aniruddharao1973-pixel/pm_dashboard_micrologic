// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//   };

//   const logout = () => {
//     // ⭐ LOGOUT SUCCESS TOAST
//     Swal.fire({
//       icon: "success",
//       title: "Logged out successfully!",
//       text: "Come back soon 👋",
//       toast: true,
//       position: "top-end",
//       timer: 2000,
//       showConfirmButton: false,
//       background: "#ffffffee",
//       color: "#333",
//     });

//     setUser(null);
//     setToken(null);

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         logout,
//         isAuthenticated: Boolean(token),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   /* ---------------------------------------------------------
//       LOGIN
//   --------------------------------------------------------- */
//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//   };

//   /* ---------------------------------------------------------
//       LOGOUT
//   --------------------------------------------------------- */
//   const logout = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Logged out successfully!",
//       text: "Come back soon 👋",
//       toast: true,
//       position: "top-end",
//       timer: 2000,
//       showConfirmButton: false,
//       background: "#ffffffee",
//       color: "#333",
//     });

//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   /* ---------------------------------------------------------
//       AUTO LOGOUT WHEN TOKEN EXPIRES
//   --------------------------------------------------------- */
// //   useEffect(() => {
// //     if (!token) return;

// //     try {
// //       const decoded = JSON.parse(atob(token.split(".")[1]));
// //       const expiry = decoded.exp * 1000;
// //       const now = Date.now();
// //       const timeLeft = expiry - now;

// //       // if (timeLeft <= 0) {
// //       //   logout();
// //       //   return;
// //       // }

// //       if (timeLeft <= 0) {
// //   setTimeout(() => logout(), 0);
// //   return;
// // }


// //       // auto logout when time reaches 0
// //       const timer = setTimeout(logout, timeLeft);
// //       return () => clearTimeout(timer);

// //     } catch (error) {
// //       console.error("Token decode failed:", error);
// //       logout();
// //     }
// //   }, [token]);

// useEffect(() => {
//   if (!token) return;

//   try {
//     const decoded = JSON.parse(atob(token.split(".")[1]));
//     const expiry = decoded.exp * 1000;
//     const now = Date.now();
//     const timeLeft = expiry - now;

//     if (timeLeft <= 0) {
//       // FIX 1: async logout
//       setTimeout(() => logout(), 0);
//       return;
//     }

//     // auto logout when time reaches 0
//     const timer = setTimeout(() => logout(), timeLeft);
//     return () => clearTimeout(timer);

//   } catch (error) {
//     console.error("Token decode failed:", error);

//     // FIX 2: async logout inside catch
//     setTimeout(() => logout(), 0);
//   }

// }, [token]);



//   /* ---------------------------------------------------------
//       AUTO REFRESH TOKEN EVERY 3 SECONDS
//   --------------------------------------------------------- */
// // REMOVE auto-expiry logout logic entirely 
// // because token is refreshed every 3 seconds

// useEffect(() => {
//   if (!token) return;

//   const interval = setInterval(async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/refresh",
//         { token }
//       );

//       if (res.data.token) {
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//       }
//     } catch (err) {
//       console.log("Auto refresh failed → Logging out");
//       logout(); // Only logout if refresh fails (rare)
//     }
//   }, 3000);

//   return () => clearInterval(interval);
// }, [token]);


//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         logout,
//         isAuthenticated: Boolean(token),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  /* ---------------------------------------------------------
      LOGIN
  --------------------------------------------------------- */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  /* ---------------------------------------------------------
      LOGOUT
  --------------------------------------------------------- */
  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      text: "Come back soon 👋",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });

    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /* ---------------------------------------------------------
      LOAD FROM LOCAL STORAGE SAFELY
  --------------------------------------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    // ✔️ Wait until everything is initialized
    setLoading(false);
  }, []);

  /* ---------------------------------------------------------
      AUTO REFRESH TOKEN (Safe Version)
  --------------------------------------------------------- */
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { token },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.token) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        }
      } catch {
        console.warn("Refresh failed. Keeping old token.");
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
