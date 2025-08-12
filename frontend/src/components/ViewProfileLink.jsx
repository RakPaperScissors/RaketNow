import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProfileLink = ({ userId, children }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        navigate(`/view-profile/${userId}`);
    };

    return (
        <span
            onClick={handleClick}
            className="cursor-pointer hover:underline"
        >
            {children}
        </span>
    );
};

export default ViewProfileLink;