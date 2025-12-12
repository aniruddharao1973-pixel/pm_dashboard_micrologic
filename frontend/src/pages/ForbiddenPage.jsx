// // src/pages/ForbiddenPage.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function ForbiddenPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
//       <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
//         <h1 className="text-4xl font-bold mb-3 text-red-600">403 Forbidden</h1>
//         <p className="text-lg text-slate-600 mb-6">
//           You don't have permission to access this resource.
//         </p>
//         <div className="flex justify-center gap-3">
//           <Link
//             to="/"
//             className="px-5 py-2 rounded-md border border-slate-200 hover:bg-slate-100"
//           >
//             Go to Dashboard
//           </Link>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Reload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/ForbiddenPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-8 py-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Access Denied
            </h1>
            
            <p className="text-sm text-gray-600 mb-1">
              Error 403 - Forbidden
            </p>
            
            <p className="text-gray-500 mb-8">
              You do not have permission to access this resource. Please contact your administrator if you believe this is an error.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Return to Dashboard
              </Link>
              
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}