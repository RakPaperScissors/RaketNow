import { useEffect, useState } from "react";
import { fetchRakets } from "../../api/rakets";
import { formatDistanceToNow } from "date-fns";

function Rakets() {
    const [Rakets, setRakets] = useState([]);

    useEffect(() => {
        fetchRakets().then(setRakets).catch(console.error);
    }, []);

    return (
        <div>
            <h2>Rakets</h2>
            <ol>
                {Rakets.map(raket => (
                    <li key={raket.raketId}>
                        <strong>{raket.title}</strong> - {raket.description} (Php {raket.budget})<br/>
                        <span style={{ color: '#555'}}>
                            Posted by: {raket.user?.name} ({raket.user?.email})
                        </span>
                        <br/>
                        <span style={{ color: '#888', fontSize: '0.9em' }}>
                            Posted {raket.dateCreated ? formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true}) : ""}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Rakets;