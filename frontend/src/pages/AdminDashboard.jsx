import React from "react";
import AdminSidebar from "../components/AdminSideBar";
import Dashboard from "../components/AdminDashboard";

export default function AdminDashboard() {
    return (
        <div className="flex h-screen bg-[#f9fafb]">
            <div className="fixed inset-y-0 left-0 w-64 z-20 bg-white border-r">
                <AdminSidebar />
            </div>

            <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 relative min-h-screen bg-[#ffffff]">
                    <div className="flex-1">
                        <Dashboard />
                    </div>
                </div>
            </div>
            </div>
            );
}
