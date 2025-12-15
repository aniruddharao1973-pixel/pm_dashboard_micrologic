


// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../api/axios";
import { Users, Folder, FileText } from "lucide-react";
import { getGreeting } from "../utils/getGreeting";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const api = useAxios();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    customers: "--",
    projects: "--",
    documents: "--",
  });

  const loadStats = async () => {
    try {
      let res;

      if (user.role === "admin" || user.role === "techsales") {
        res = await api.get("/dashboard/admin");

        setStats({
          customers: res.data.totalCustomers,
          projects: res.data.totalProjects,
          documents: res.data.totalDocuments,
        });
      } else {
        res = await api.get("/dashboard/customer");

        setStats({
          projects: res.data.totalProjects,
          documents: res.data.totalDocuments,
        });
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  return (
    <div
      className="
        w-full
        /* Responsive Height */
        h-[calc(100vh-80px)]
        
        /* Enable smooth scrolling */
        overflow-y-auto scroll-smooth
        
        /* Responsive Padding */
        px-3 py-4 sm:p-6 md:p-8
        
        /* Background */
        bg-gradient-to-br from-gray-50 via-white to-gray-50/40
      "
      style={{
        /* Scrollbar Styling */
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header Section with responsive spacing */}
        <div className="space-y-1 sm:space-y-2">
          {/* Responsive heading with flexible layout */}
          <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {getGreeting()}, {user?.name}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl">👋</span>
          </h1>

          {/* Responsive subtitle */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl">
            {user.role === "admin" || user.role === "techsales"
              ? "Here's your dashboard summary for today."
              : "Here's your project summary for today."}
          </p>
        </div>

        {/* Stats Grid with improved responsive layout */}
        <div
          className={`grid gap-4 sm:gap-5 md:gap-6 ${
            user.role === "admin" || user.role === "techsales"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 max-w-4xl"
          }`}
        >
          {/* Customer Card - Admin/Techsales only */}
          {(user.role === "admin" || user.role === "techsales") && (
            <div
              onClick={() => navigate("/admin/customers")}
              className="group cursor-pointer bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-0 sm:hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full -mr-12 -mt-12 sm:-mr-14 sm:-mt-14 md:-mr-16 md:-mt-16" />
              
              <div className="relative">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-2.5 md:p-3 bg-pink-500/10 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-pink-600 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-gray-700 text-sm sm:text-base font-semibold">
                      Total Customers
                    </h3>
                  </div>
                </div>

                {/* Stats Content */}
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {stats.customers}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                      Updated just now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Card */}
          <div
            onClick={() => navigate("/projects")}
            className="group cursor-pointer bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-0 sm:hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-12 -mt-12 sm:-mr-14 sm:-mt-14 md:-mr-16 md:-mt-16" />
            
            <div className="relative">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-blue-500/10 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Folder className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-gray-700 text-sm sm:text-base font-semibold">
                    {user.role === "admin" || user.role === "techsales" 
                      ? "Total Projects" 
                      : "My Projects"}
                  </h3>
                </div>
              </div>

              {/* Stats Content */}
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stats.projects}
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                    Updated just now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;