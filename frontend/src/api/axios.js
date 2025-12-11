// // src/api/axios.js
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";

// // Custom hook to access axios with auth
// export const useAxios = () => {
//   const { token, logout } = useContext(AuthContext);

//   const instance = axios.create({
//     baseURL: "http://localhost:5000/api", // <-- change if your backend uses different URL
//   });

//   // Attach token automatically
//   instance.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Auto logout on expired token
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         logout();
//       }
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };




// src/api/axios.js
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAxios = () => {
  const { token, logout, login, user } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  /* ---------------------------------------------------------
      ATTACH TOKEN FOR EVERY REQUEST
  --------------------------------------------------------- */
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  /* ---------------------------------------------------------
      RESPONSE INTERCEPTOR
      - Handles token expiry
      - Attempts silent refresh
      - Retries the failed request
  --------------------------------------------------------- */
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { token }
        );

        if (res.data.token) {
          login(user, res.data.token);

          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.warn("🔁 Silent refresh failed. Ignoring. Not logging out.");
        return Promise.reject(error);
        // ❌ DO NOT LOGOUT HERE
      }
    }

    return Promise.reject(error);
  }
);


  return instance;
};
