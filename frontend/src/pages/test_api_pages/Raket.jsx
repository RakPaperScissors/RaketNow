import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

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
            <div>
            <h2><strong>{raket.title}</strong></h2>
            <p>{raket.description}</p>
            <p>Budget: Php {raket.budget}</p>
            <p>Posted by: {raket.user?.name} ({raket.user?.email})</p>
            <p>Posted {raket.dateCreated ? formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true}) : ""}</p>
            </div>
            <div>
                <h2><strong>About Me</strong></h2>
                <h2>Name: {raket.user?.name}</h2>
                <h3>Email: {raket.user?.name}</h3>
                <p>{raket.user?.bio}</p>
            </div>
        </div>
    );
}

export default Raket;