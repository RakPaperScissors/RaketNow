import { useHomeFeed } from "../../hooks/useHomeFeed";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel";

function Home() {

    const { user, feed, message, search, setSearch, handlePostRaket } = useHomeFeed();
    const currentUser = useCurrentUser();
    
    if (message) return <div>{message}</div>
    if (!user) return <div>Loading...</div>

    const isNew = new Date() - new Date(user.createdAt) < 24 * 60 * 60 * 1000;
    
    const filteredFeed = feed.filter((item) => 
        user.type === "Raketista"
            ? item.title?.toLowerCase().includes(search.toLowerCase())
            : (item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div style={{ border: '3px solid black', margin: '10px', padding: '16px' }}>
            {/*Debug panel here*/}
            <DebugPanel user={currentUser} />
            <h1>
                {isNew
                    ? `Welcome, ${user.name?.split(" ")[0] || "User"}!`
                    : `Welcome back, ${user.name?.split(" ")[0] || "User"}!`}
            </h1>

            <h2>
                {user.type === "Raketista" ? "Available Rakets" : "Raketistas"}
            </h2>

            {["client", "organization", "raketista"].includes(user.role) && (
                <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handlePostRaket({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    budget: e.target.budget.value,
                    });
                    e.target.reset();
                }}
                style={{
                    margin: "24px 0",
                    padding: 16,
                    border: "1px solid #ccc",
                    borderRadius: 8,
                }}
                >
                <h3>Post a Raket</h3>
                <input name="title" placeholder="Title" required />
                <textarea name="description" placeholder="Description" required />
                <input name="budget" type="number" placeholder="Budget" required />
                <button type="submit">Post</button>
                </form>
            )}
            

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 8, padding: 8, width: "100%" }}
            />

            {filteredFeed.length === 0 && <p>No items to show.</p>}

            {user.role === "raketista"
                ? filteredFeed.map((raket) => (
                    <div key={raket.raketId}  style={{ border: '3px solid black', margin: '10px', padding: '16px' }}>
                        <h3>{raket.title}</h3>
                        <p>{raket.description}</p>
                        <p>Budget: Php {raket.budget}</p>
                        <p>
                            Posted by: {raket.user?.name} ({raket.user?.email})
                        </p>
                        <p>
                            {raket.dateCreated &&
                            formatDistanceToNow(new Date(raket.dateCreated), {
                                addSuffix: true,
                            })}
                        </p>
                        <Link to={`/raket/${raket.raketId}`} style={{ color: "blue" }}>See more</Link>
                    </div>
                ))
                : filteredFeed.map((raketista) => (
                    <div key={raketista.uid} style={{ border: '3px solid black', margin: '10px', padding: '16px' }}>
                        <strong>{raketista.name}</strong>
                        <p>Email: {raketista.email}</p>
                        <p>{raketista.bio}</p>
                        <div style={{ border: '3px solid black', margin: '10px', padding: '16px' }}>
                            {raketista.raketistaSkills?.length > 0 ? (
                                <ul>
                                {raketista.raketistaSkills.map((rs, i) => (
                                    <li key={i}>
                                    {rs.skill.skillName} ({rs.skill.category})
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p>No skills.</p>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Home;