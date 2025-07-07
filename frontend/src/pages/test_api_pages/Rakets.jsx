import { useEffect, useState } from "react";
import { fetchRakets } from "../../api/rakets";

function Rakets() {
    const [Rakets, setRakets] = useState([]);

    useEffect(() => {
        fetchRakets().then(setRakets).catch(console.error);
    }, []);

    return (
        <div>
            <h2>Rakets</h2>
            <ol>
                {Rakets.map(raket => (<li key={raket.raketId}>{raket.title} - {raket.description} (Php {raket.budget})</li>))}
            </ol>
        </div>
    )
}

export default Rakets;