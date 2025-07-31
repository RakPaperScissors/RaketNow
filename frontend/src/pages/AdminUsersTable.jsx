import React from "react";
import AdminSidebar from "../components/AdminSideBar";
import UsersTable from "../components/UsersTable";

function AdminUsersTable() {
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* SIDEBAR */}
      <div className="fixed inset-y-0 left-0 w-64 z-20 bg-white border-r">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 relative min-h-screen bg-white overflow-y-auto p-6">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

export default AdminUsersTable;
