import React from "react";
import {
    UserCheck,
    Users,
    AlertOctagon,
    Eye,
} from "lucide-react";
import adminBanner from "../assets/images/admin-banner.png";

const dashboardStats = [
    {
        title: "Online Users",
        value: "24",
        icon: <UserCheck className="w-6 h-6 text-green-600" />,
        color: "bg-green-100",
    },
    {
        title: "Total Users",
        value: "183",
        icon: <Users className="w-6 h-6 text-purple-600" />,
        color: "bg-purple-100",
    },
    {
        title: "Error Rate",
        value: "2.1%",
        icon: <AlertOctagon className="w-6 h-6 text-red-600" />,
        color: "bg-red-100",
    },
];

export default function AdminDashboard() {
    const fullName = "Admin";

    return (
        <>
            <div className="space-y-10">
                {/* Welcome Banner */}
                <div className="relative w-full h-70 bg-gradient-to-r from-[#EFF6FF] to-[#FFF7ED] text-[#0C2C57] flex justify-between items-center px-10 overflow-hidden">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Hi, {fullName.split(" ")[0]}!
                        </h1>
                        <p className="text-base">
                            Ready to manage RaketNow and check on today’s performance?            </p>
                    </div>
                    <img
                        src={adminBanner}
                        alt="Admin Banner"
                        className="w-58 h-58 object-contain"
                    />
                </div>
            </div>

            <div className="space-y-6 mt-10 px-8">
                <h2 className="text-l font-semibold text-gray-700">Overview</h2>

                {/* Combined Visits Card */}
                <div className="w-full p-6 rounded-xl bg-gradient-to-r from-[#DCEAFA] to-indigo-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Eye className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Visits This Month</p>
                            <p className="text-xl font-bold text-gray-800">8,942</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Eye className="w-8 h-8 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-600">Total Visits</p>
                            <p className="text-xl font-bold text-gray-800">52,341</p>
                        </div>
                    </div>
                </div>

                {/* Remaining Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardStats.map((stat) => (
                        <div
                            key={stat.title}
                            className={`p-4 rounded-xl ${stat.color} flex items-center gap-4`}
                        >
                            <div className="shrink-0">{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                                <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}
