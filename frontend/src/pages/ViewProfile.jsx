import React from "react";
import { Mail, User, Hammer, Pencil, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useViewProfile } from "../hooks/useViewProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import SideNav from "../components/SideNav";

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

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
                {/* Profile Card Section */}
                <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {/* <img
                                src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : (user.profilePicture || "https://randomuser.me/api/portraits/lego/6.jpg")}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default_profile.jpg"
                                }}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-orange-300"
                                />    */}

                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium capitalize">{user.type === "Users" ? "Client" : user.type}</span>
                                <span>• Joined {formatDate(user.createdAt)}</span>
                                </div>
                                <div className="flex items-center text-gray-600 mt-1">
                                <Mail className="w-4 h-4 mr-1.5" />
                                <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 ">
                        <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2"><User className="w-5 h-5" /> Bio</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{user.bio || "No bio has been added yet."}</p>
                    </div>
                </div>

                {/* Rakets Section */}
            </main>
        </div>
    );
};

export default ViewProfile;