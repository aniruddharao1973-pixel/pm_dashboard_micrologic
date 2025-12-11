



// // frontend/src/pages/admin/CustomerListForProjects.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";

// function CustomerListForProjects() {
//   const { getCustomers } = useAdminApi();
//   const [customers, setCustomers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getCustomers();
//         setCustomers(res.data || []);
//       } catch (err) {
//         console.error("Error loading customers", err);
//       }
//     })();
//   }, []);

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/40 p-8">

//           <div
//         className="
//           w-full
//           h-[calc(100vh-80px)]   /* 🔥 adjust height depending on header size */
//           overflow-y-scroll
//           scroll-smooth
//           bg-gradient-to-br from-gray-50 via-white to-indigo-50/40
//           p-6 md:p-8
//         "
//         style={{
//           scrollbarWidth: "thin",
//           scrollbarColor: "#cbd5e1 #f1f5f9",
//         }}
//       >

//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
//               Select Customer
//             </h1>
//               {/* <p className="text-sm text-gray-500 max-w-xl">
//                 Pick a customer to open their projects. Hover a card for quick actions.
//               </p> */}
//           </div>
//         </div>

//         {/* Grid of customer cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {customers.map((cust, index) => {
//             // defensive, optional fields
//             const projectsCount = cust.projects_count ?? (cust.projects ? cust.projects.length : undefined);
//             const usersCount = cust.users_count ?? cust.user_count ?? undefined;
//             const lastActive = cust.last_active || cust.updated_at || cust.created_at || null;
//             const shortDate = lastActive ? new Date(lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;

//             return (
//               <div
//                 key={cust.company_id}
//                 onClick={() => navigate(`/admin/company/${cust.company_id}`)}
//                 className="group cursor-pointer bg-white rounded-3xl border border-indigo-200 shadow-md
//                            hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
//                 style={{ animationDelay: `${index * 60}ms` }}
//               >
//                 {/* top accent */}
//                 <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />

//                 <div className="p-6">
//                   {/* Icon + Name (larger hero name) */}
//                   <div className="flex items-start gap-6">
//                     <div className="flex-shrink-0">
//                       <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600
//                                       flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
//                         {cust.company_name ? cust.company_name.charAt(0).toUpperCase() : "C"}
//                       </div>
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
//                         {cust.company_name}
//                       </h2>

//                       {/* subtitle / tagline (if exists) */}
//                       {cust.description ? (
//                         <p className="mt-2 text-sm text-gray-500 truncate max-w-xl">{cust.description}</p>
//                       ) : (
//                         <p className="mt-2 text-sm text-gray-400"></p>
//                       )}

//                       {/* stats row (conditionally shown) */}
//                       <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
//                         {typeof projectsCount !== "undefined" && (
//                           <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium shadow-sm">
//                             <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
//                             </svg>
//                             {projectsCount} projects
//                           </div>
//                         )}

//                         {typeof usersCount !== "undefined" && (
//                           <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium shadow-sm">
//                             <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13z" />
//                             </svg>
//                             {usersCount} users
//                           </div>
//                         )}

//                         {shortDate && (
//                           <div className="text-xs text-gray-400">Updated {shortDate}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* divider */}
//                   <div className="mt-5 border-t border-indigo-100/60 pt-4 flex items-center justify-between">
//                     {/* CTA pill (higher prominence) */}
//                     <span
//                       className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-sm font-semibold shadow cursor-pointer"
//                       onClick={(e) => { e.stopPropagation(); navigate(`/admin/company/${cust.company_id}`); }}
//                     >
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                       View Projects
//                     </span>

//                     {/* quick arrow on the right */}
//                     {/* <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center
//                                     group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
//                       <svg className="w-5 h-5 text-indigo-700 group-hover:text-white transform group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </div> */}
//                   </div>

//                   {/* subtle activity bar (visual only) */}
//                   <div className="mt-6">
//                     <div className="h-1.5 bg-indigo-500 rounded-full overflow-hidden">
//                       <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
//                            style={{ width: `${Math.min(75, (projectsCount || 0) * 10)}%`, transition: 'width .4s ease' }} />
//                     </div>
//                     {/* <div className="text-xs text-gray-400 mt-2">Activity level</div> */}
//                   </div>
//                 </div>

//                 {/* gentle overlay when hovered */}
//                 <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-8"
//                      style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.03))" }} />
//               </div>
//             );
//           })}
//         </div>

//         {/* empty state */}
//         {customers.length === 0 && (
//           <div className="text-center py-20">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
//               <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No Customers Found</h3>
//             <p className="text-gray-500">Start by creating your first customer</p>

//             <div className="mt-6">
//               {/* <button
//                 onClick={() => navigate("/admin/create-company")}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold
//                            bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 shadow hover:shadow-lg transition"
//               >
//                 ➕ Create Customer
//               </button> */}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomerListForProjects;



// frontend/src/pages/admin/CustomerListForProjects.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";

function CustomerListForProjects() {
  const { getCustomers } = useAdminApi();
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCustomers();
        setCustomers(res.data || []);
      } catch (err) {
        console.error("Error loading customers", err);
      }
    })();
  }, []);

  return (
    <div
      className="
        w-full
        h-[calc(100vh-80px)]
        overflow-y-scroll
        scroll-smooth
        bg-gradient-to-br from-gray-50 via-white to-indigo-50/40
        p-4 sm:p-6 md:p-8
      "
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header - Responsive text size */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Select Customer
            </h1>
          </div>
        </div>

        {/* Grid of customer cards - Responsive columns and gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {customers.map((cust, index) => {
            // defensive, optional fields
            const projectsCount = cust.projects_count ?? (cust.projects ? cust.projects.length : undefined);
            const usersCount = cust.users_count ?? cust.user_count ?? undefined;
            const lastActive = cust.last_active || cust.updated_at || cust.created_at || null;
            const shortDate = lastActive ? new Date(lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;

            return (
              <div
                key={cust.company_id}
                onClick={() => navigate(`/admin/company/${cust.company_id}`)}
                className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-indigo-200 shadow-md
                           hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative
                           touch-manipulation active:scale-[0.99]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* top accent */}
                <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />

                <div className="p-4 sm:p-5 md:p-6">
                  {/* Icon + Name - Responsive sizes */}
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                                      rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600
                                      flex items-center justify-center text-white font-extrabold 
                                      text-lg sm:text-xl md:text-2xl 
                                      shadow-md group-hover:scale-105 transition-transform duration-300">
                        {cust.company_name ? cust.company_name.charAt(0).toUpperCase() : "C"}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl 
                                  font-bold text-gray-900 group-hover:text-indigo-600 
                                  transition-colors leading-tight 
                                  truncate sm:whitespace-normal sm:overflow-visible">
                      {cust.company_name}
                    </h2>

                      {/* subtitle / tagline */}
                      {cust.description ? (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 truncate max-w-xl">{cust.description}</p>
                      ) : (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400"></p>
                      )}

                      {/* stats row - Responsive text and spacing */}
                      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                        {typeof projectsCount !== "undefined" && (
                          <div className="inline-flex items-center gap-1 sm:gap-2 
                                          bg-indigo-50 text-indigo-700 
                                          px-1.5 sm:px-2 py-0.5 sm:py-1 
                                          rounded-full font-medium shadow-sm text-[10px] sm:text-xs">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                            {projectsCount} projects
                          </div>
                        )}

                        {typeof usersCount !== "undefined" && (
                          <div className="inline-flex items-center gap-1 sm:gap-2 
                                          bg-purple-50 text-purple-700 
                                          px-1.5 sm:px-2 py-0.5 sm:py-1 
                                          rounded-full font-medium shadow-sm text-[10px] sm:text-xs">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13z" />
                            </svg>
                            {usersCount} users
                          </div>
                        )}

                        {shortDate && (
                          <div className="text-[10px] sm:text-xs text-gray-400">Updated {shortDate}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="mt-3 sm:mt-4 md:mt-5 
                                  border-t border-indigo-100/60 
                                  pt-3 sm:pt-4 
                                  flex items-center justify-between">
                    {/* CTA pill - Responsive size */}
                    <span
                      className="inline-flex items-center gap-1.5 sm:gap-2 
                                 px-2.5 sm:px-3 py-1 sm:py-1.5 
                                 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 
                                 text-white text-xs sm:text-sm font-semibold shadow cursor-pointer
                                 hover:shadow-lg transition-all duration-200"
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/company/${cust.company_id}`); }}
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      View Projects
                    </span>
                  </div>

                  {/* subtle activity bar */}
                  <div className="mt-4 sm:mt-5 md:mt-6">
                    <div className="h-1 sm:h-1.5 bg-indigo-500 rounded-full overflow-hidden">
                      <div className="h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                           style={{ width: `${Math.min(75, (projectsCount || 0) * 10)}%`, transition: 'width .4s ease' }} />
                    </div>
                  </div>
                </div>

                {/* gentle overlay when hovered */}
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-8"
                     style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.03))" }} />
              </div>
            );
          })}
        </div>

        {/* empty state - Responsive sizes */}
        {customers.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 
                            rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 
                            flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1.5 sm:mb-2">No Customers Found</h3>
            <p className="text-sm sm:text-base text-gray-500">Start by creating your first customer</p>

            <div className="mt-4 sm:mt-6">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerListForProjects;
