import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom"; // React Router navigation

const categoryColors = {
    "Maintenance & Repair": "bg-yellow-100 text-yellow-800",
    "Tech & Electronics": "bg-blue-100 text-blue-800",
    "Personal & Home Care": "bg-pink-100 text-pink-800",
    "Events & Entertainment": "bg-purple-100 text-purple-800",
    "Food & Beverage": "bg-red-100 text-red-800",
    "Education & Tutoring": "bg-green-100 text-green-800",
    "Graphic & Digital Design": "bg-indigo-100 text-indigo-800",
    "Business & Professional Services": "bg-orange-100 text-orange-800",
    "Automotive": "bg-gray-200 text-gray-800",
    "Moving & Delivery Services": "bg-teal-100 text-teal-800",
};

Modal.setAppElement("#root");

const RaketCard = ({
    images = [],
    title,
    description = "",
    budget,
    user,
    postedAt,
    location,
    rating,
    category,
}) => {
    const navigate = useNavigate(); // Initialize navigate function

    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const displayedImages = images.slice(0, 4);
    const badgeStyle = categoryColors[category] || "bg-gray-100 text-gray-700";

    const openModal = (index) => {
        setActiveIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const goPrev = () =>
        setActiveIndex((prev) => (prev === 0 ? displayedImages.length - 1 : prev - 1));
    const goNext = () =>
        setActiveIndex((prev) => (prev === displayedImages.length - 1 ? 0 : prev + 1));

    useEffect(() => {
        const handleKey = (e) => {
            if (!modalOpen) return;
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [modalOpen]);

    // Redirect to chat using React Router
    const redirectToChat = (user) => {
        navigate(`/chat?to=${encodeURIComponent(user)}`);
    };

    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden w-full max-w-2xl mx-auto p-4 flex flex-col">
            {/* Category Badge */}
            {category && (
                <span
                    className={`absolute top-4 right-3 px-2 py-1 text-xs font-semibold rounded-full ${badgeStyle}`}
                >
                    {category}
                </span>
            )}

            {/* Title */}
            <h2 className="font-semibold text-lg text-[#0C2C57] mt-10 mb-2">{title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">{description}</p>

            {/* Image Grid */}
            {displayedImages.length > 0 && (
                <div
                    className={`grid gap-2 mb-4 ${
                        displayedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                >
                    {displayedImages.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            onClick={() => openModal(idx)}
                            alt={`Preview ${idx}`}
                            className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-90"
                        />
                    ))}
                </div>
            )}

            {/* Modal for Image Viewing */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Image viewer"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
                overlayClassName="fixed inset-0 z-50"
            >
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="fixed top-6 right-6 text-white text-xl font-bold z-50 hover:text-red-300 transition"
                >
                    ✕
                </button>

                {/* Image display */}
                <div className="relative max-w-3xl w-full flex justify-center items-center px-4">
                    <img
                        src={displayedImages[activeIndex]}
                        alt="Full view"
                        className="max-h-[80vh] w-auto rounded shadow-lg"
                    />
                </div>
            </Modal>

            {/* Footer Info */}
            <div className="mt-auto flex flex-col gap-2 text-xs text-gray-500">
                {(user || postedAt || location) && (
                    <div>
                        {user && (
                            <p>
                                Posted by:{" "}
                                <span className="font-medium text-[#0C2C57]">{user.firstName} {user.lastName}</span>
                            </p>
                        )}
                        {(postedAt || location) && (
                            <p>
                                {postedAt} {postedAt && location && "•"} {location}
                            </p>
                        )}
                    </div>
                )}

                {/* Budget and Message Icon */}
                {(budget || rating) && (
                    <div className="flex items-center justify-between text-sm mt-1">
                        {budget && (
                            <span className="text-[#FF7C2B] font-bold">₱{budget}</span>
                        )}

                        {user && (
                            <button
                                onClick={() => redirectToChat(user)}
                                className="flex items-center gap-1 text-[#0C2C57] hover:text-orange-500 transition"
                            >
                                <Send size={18} />
                                <span className="text-xs font-medium"> Apply Raket</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaketCard;
