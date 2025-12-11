// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useAuthApi } from "../api/authApi";
// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import ChangePasswordModal from "../components/modals/ChangePasswordModal";
// import { Eye, EyeOff } from "lucide-react";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login: saveLogin } = useAuth();
//   const { login: loginApi } = useAuthApi();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [tempUserId, setTempUserId] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await loginApi({ email, password });

//       // First-time login
//       if (res.data.mustChangePassword) {
//         setTempUserId(res.data.userId);
//         setShowChangePassword(true);
//         return;
//       }

//       // Normal login
//       saveLogin(res.data.user, res.data.token);

//       // 🎉 SUCCESS TOAST
//       Swal.fire({
//         icon: "success",
//         title: "Logged in successfully!",
//         toast: true,
//         position: "top-end",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       navigate("/dashboard");
//     } catch (err) {
//       // ❌ ERROR TOAST
//       Swal.fire({
//         icon: "error",
//         title: err?.response?.data?.message || "Invalid email or password",
//         toast: true,
//         position: "top-end",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Password Change Modal */}
//       {showChangePassword && (
//         <ChangePasswordModal
//           open={showChangePassword}
//           userId={tempUserId}
//           onChanged={() => {
//             Swal.fire({
//               icon: "success",
//               title: "Password updated! Login again.",
//               toast: true,
//               position: "top-end",
//               timer: 2000,
//               showConfirmButton: false,
//             });
//             setShowChangePassword(false);
//           }}
//         />
//       )}

//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 w-full max-w-md">

//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
//             Login
//           </h2>

//           {error && (
//             <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password with Eye Toggle */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />

//                 <div
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer 
//                              transition-transform duration-200 hover:scale-110 active:scale-90"
//                 >
//                   {showPass ? (
//                     <EyeOff className="h-5 w-5 text-gray-500" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-500" />
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 text-white rounded-lg font-medium transition ${
//                 loading
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {loading ? "Please wait..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;



// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuthApi } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import { Eye, EyeOff, Mail, Lock, LogIn, Shield, Sparkles, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { login: saveLogin } = useAuth();
  const { login: loginApi } = useAuthApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [tempUserId, setTempUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi({ email, password });

      if (res.data.mustChangePassword) {
        setTempUserId(res.data.userId);
        setShowChangePassword(true);
        return;
      }

      saveLogin(res.data.user, res.data.token);

      // 🎉 SUCCESS TOAST - Blue/Purple Theme
      Swal.fire({
        icon: "success",
        title: "Welcome Back! ✨",
        html: '<p class="text-indigo-600 font-semibold">Successfully logged in</p>',
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border-2 border-indigo-200',
          timerProgressBar: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
        }
      });

        // Admin + Tech Sales → same dashboard
        if (res.data.user.role === "admin" || res.data.user.role === "techsales") {
          navigate("/dashboard");
        } else {
          // Customer + Collaborator → customer dashboard
          navigate("/customer/dashboard");
        }


    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        html: `<p class="text-red-700 font-semibold">${err?.response?.data?.message || "Invalid email or password"}</p>`,
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border-2 border-red-300',
          timerProgressBar: 'bg-gradient-to-r from-red-500 to-rose-500'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showChangePassword && (
        <ChangePasswordModal
          open={showChangePassword}
          userId={tempUserId}
          onChanged={() => {
            Swal.fire({
              icon: "success",
              title: "Password Updated! 🔐",
              html: '<p class="text-indigo-600 font-semibold">Please login with your new password</p>',
              toast: true,
              position: "top-end",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              background: "linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)",
              customClass: {
                popup: 'rounded-2xl shadow-2xl border-2 border-indigo-200',
                timerProgressBar: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
              }
            });
            setShowChangePassword(false);
          }}
        />
      )}

      {/* Main Container with Blue/Purple Gradient */}
<div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden 
  bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">


  



        {/* Animated Gradient Orbs */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-indigo-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-300/40 to-blue-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div> */}

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-indigo-200/30 rounded-2xl transform rotate-12 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-purple-200/30 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 border-2 border-blue-200/30 rounded-2xl transform -rotate-12 animate-float animation-delay-3000"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #6366f1 1px, transparent 1px),
              linear-gradient(to bottom, #6366f1 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}>
        </div>

        {/* Main Card Container */}
        <div className="relative z-10 w-full max-w-lg">
          
          {/* Glass Morphism Card */}
          <div className="relative backdrop-blur-2xl bg-white/80 rounded-3xl p-12 shadow-[0_8px_32px_rgba(99,102,241,0.15)] border border-white/50 overflow-hidden">
            
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient"></div>
            
            {/* Decorative Circles */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Logo Section */}
              <div className="flex justify-center mb-10">
                <div className="relative group cursor-pointer">
                  {/* Animated Glow Ring */}
                  {/* <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-glow"></div> */}
                  
                  {/* Logo Container */}
                  <div className="relative bg-white p-7 rounded-3xl shadow-2xl ring-1 ring-indigo-100 transform group-hover:scale-105 transition-all duration-300">
                    <img 
                      src="/micrologic_logo.png" 
                      alt="Micrologic Logo" 
                      className="w-28 h-24 object-contain"
                    />
                    {/* Corner Decorations */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-blue-400 rounded-tl-xl"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-purple-400 rounded-br-xl"></div>
                  </div>
                </div>
              </div>

              {/* Header Section */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500 mr-2 animate-pulse" />
                  <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome 
                  </h1>
                  <Sparkles className="w-5 h-5 text-purple-500 ml-2 animate-pulse animation-delay-1000" />
                </div>
                
                <p className="text-slate-600 font-medium mb-4">
                  Sign in to access your account
                </p>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 relative animate-shake">
                  <div className="absolute inset-0 bg-red-200 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 px-5 py-4 rounded-2xl shadow-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                      <p className="ml-3 text-sm font-semibold text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Field */}
                <div className="group">
                  <label className="flex items-center text-sm font-bold text-slate-700 mb-3 ml-1">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-5 py-4 border-2 border-indigo-100 rounded-2xl
                        focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 
                        transition-all duration-300 
                        bg-gradient-to-br from-white to-indigo-50/30
                        text-slate-800 placeholder-slate-400 
                        shadow-sm hover:shadow-md hover:border-indigo-200
                        font-medium outline-none"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {/* Animated Indicator Dot */}
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="flex items-center text-sm font-bold text-slate-700 mb-3 ml-1">
                    <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      className="w-full px-5 py-4 pr-14 border-2 border-indigo-100 rounded-2xl
                        focus:border-purple-400 focus:ring-4 focus:ring-purple-100 
                        transition-all duration-300
                        bg-gradient-to-br from-white to-purple-50/30
                        text-slate-800 placeholder-slate-400 
                        shadow-sm hover:shadow-md hover:border-purple-200
                        font-medium outline-none"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/* Toggle Password Visibility */}
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-2 flex items-center px-3 
                        text-indigo-600 hover:text-purple-600 
                        hover:bg-indigo-50 rounded-xl 
                        transition-all duration-200 group/btn"
                    >
                      {showPass ? (
                        <EyeOff className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      ) : (
                        <Eye className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full py-4 mt-8 rounded-2xl font-bold text-base 
                    transition-all duration-300 transform overflow-hidden group/btn
                    ${loading
                      ? "bg-slate-400 cursor-not-allowed text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-600/60 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                >
                  {/* Animated Gradient Overlay */}
                  {!loading && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </>
                  )}
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing you in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        Sign In
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Security Badge */}
<div className="mt-8 relative">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur-sm"></div>

  <div className="relative flex flex-col items-center justify-center px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-indigo-100 shadow-sm">
    <div className="flex items-center space-x-2">
      <Shield className="w-5 h-5 text-indigo-600" />
      <span className="text-xs font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
        256-bit SSL Secured • Your data is encrypted
      </span>
    </div>

    {/* COPYRIGHT ADDED HERE */}
    <p className="text-[14px] text-slate-800 mt-2">
      © 2025 Micrologic. All rights reserved.
    </p>
  </div>
</div>

            </div>
          </div>

          {/* Footer Links */}
          {/* <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-slate-600">
              Need assistance?{" "}
              <a href="mailto:support@company.com" 
                className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600 inline-flex items-center group transition-all">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
              <a href="#" className="hover:text-indigo-600 font-semibold transition-colors hover:underline">Privacy Policy</a>
              <span className="text-indigo-300">•</span>
              <a href="#" className="hover:text-indigo-600 font-semibold transition-colors hover:underline">Terms of Service</a>
              <span className="text-indigo-300">•</span>
              <a href="#" className="hover:text-indigo-600 font-semibold transition-colors hover:underline">Help Center</a>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              © 2024 Micrologic. All rights reserved.
            </p>
          </div> */}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-blob {
          animation: blob 8s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Login;