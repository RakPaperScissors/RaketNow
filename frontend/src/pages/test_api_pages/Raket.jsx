import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Raket() {
    const { id } = useParams();
    const [raket, setRaket] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            console.error("You are not logged in.");
            return;
        }

        fetch(`http://localhost:3000/rakets/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Not found");
            }
            return response.json();
        })
        .then(setRaket)
        .catch(() => setMessage("Failed to fetch raket."));

    }, [id])

    if (message) return <div>{message}</div>;
    if (!raket) return <div>Loading...</div>;

    return (
        <div>
            <h2>{raket.title}</h2>
            <p>{raket.description}</p>
            <p>Budget: Php {raket.budget}</p>
            <p>Posted by: {raket.user?.name} ({raket.user?.email})</p>
            <p>Posted at: </p>
        </div>
    );
}

export default Raket;