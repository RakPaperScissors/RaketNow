import { useRaket } from "../../hooks/useRaket";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function Raket() {
    const { id } = useParams();
    const { raket, loading, error } = useRaket(id);

    if (error) return <div>{error}</div>;
    if (loading) return <div>Loading...</div>;

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
                <h3>Email: {raket.user?.email}</h3>
                <p>{raket.user?.bio}</p>
            </div>
        </div>
    );
}

export default Raket;