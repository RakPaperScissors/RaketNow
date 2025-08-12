import React from "react";
import { useParams } from "react-router-dom";
import { useViewProfile } from "../hooks/useViewProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import SideNav from "../components/SideNav";

const ViewProfile = () => {
    const { userId } = useParams();
    const { user, loading, error } = useViewProfile(userId);

    if (loading) return <LoadingSpinner fullScreen/>
    if (error) return <p className="text-center text-red-500">{error}</p>

    if (!user) return <p className="text-center text-gray-500">User not found.</p>
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideNav />

            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-[#0c2c57] mb-6">{user.firstName}'s Profile</h1>
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
                <div className="flex items-center gap-4">
                    <img
                    src={user.picture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                    <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">About</h2>
                    <p className="text-gray-700 mt-2">{user.bio || "No bio available"}</p>
                </div>
            </div>
            </main>
        </div>
    );
};

export default ViewProfile;