import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";

function Home() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    // const [rakets, setRakets] = useState([]);
    const [feed, setFeed] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if(!accessToken) {
            setMessage("You are not logged in.");
            return;
        }

        // Fetch user profile
        fetch("http://localhost:3000/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => response.json())
        .then((data) => {
            setUser(data);

            // Feed based on user role
            if (data.role === "raketista") {
                // Show the rakets from clients
                fetch("http://localhost:3000/rakets", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                .then((response) => response.json())
                .then(setFeed);
            } else if (data.role === "client" || data.role === "organization") {
                // Show raketista profiles
                fetch("http://localhost:3000/user?role=raketista", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                .then((response) => response.json())
                .then(setFeed);
            }
        }) 
        .catch(() => setMessage("Failed to fetch profile."));
    }, []);

    if (message) return <div>{message}</div>
    if (!user) return <div>Loading...</div>

    const isNew = user.createdAt && new Date() - new Date(user.createdAt) < 24 * 60 * 60 * 1000;
    
    const filteredFeed = feed.filter(item => {
        if (user.role === "raketista") {
            // Search raket title
            return (
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        } else {
            // Search raketista name or email
            return (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase())
            );
        }
    });

    return (
        <div style={{ border: '3px solid black', margin: '10px', padding: '16px' }}>
            <h1>
                {isNew ? `Welcome, ${user.name.split(" ")[0]}!` : `Welcome back, ${user.name.split(" ")[0]}!`}
            </h1>

            <h2>
                {user.role === "raketista" ? "Available Rakets" : "Raketistas"}
            </h2>

            {(user.role === "client" || user.role === "organization") && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setMessage("");
                        try {
                            const response = await fetch("http://localhost:3000/rakets", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${accessToken}`,
                                },
                                body: JSON.stringify({
                                    title: e.target.title.value,
                                    description: e.target.description.value,
                                    budget: e.target.budget.value,
                                }),
                            })
                            if (response.ok) {
                                setMessage("Raket posted!");
                                e.target.reset();
                                // Refresh feed
                                fetch("http://localhost:3000/rakets", {
                                    headers: {Authorization: `Bearer ${accessToken}`},
                                })
                                .then((r) => r.json())
                                .then(setFeed);
                            } else {
                                const data = await response.json();
                                setMessage(data.message || "Failed to post raket.");
                            }
                        } catch {
                            setMessage("An error occured while posting raket. Please try again.");
                        }
                    }}
                    style={{ margin: "24px 0", padding: 16, border: "1px solid #ccc", borderRadius: 8 }}
                >
                    <h3>Post a Raket</h3>
                    <input name="title" placeholder="Title" required style={{ width: "100%", marginBottom: 8, padding: 8}} />
                    <textarea name="description" placeholder="Description" required style={{ width: "100%", marginBottom: 8, padding: 8 }} /> 
                    <input name="budget" type="number" placeholder="Budget" required style={{ width: "100%", marginBottom: 8, padding: 8 }} />
                    <button type="submit" style={{ padding: 8, background: "#0C2C57", color: "#fff", border: "none", borderRadius: 4 }}>
                        Post    
                    </button>               
                    
                    </form>
            )}

            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ margin: "12px 0", padding: 8, width: "100%", maxWidth: 400, border: "1px solid $ccc" }}
            />
            <div>
                {filteredFeed.length === 0 && <p>No items to show.</p>}
                {user.role === "raketista" ?
                filteredFeed.map((raket) => (
                    <div key={raket.raketId} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
                        <h3><strong>{raket.title}</strong></h3>
                        <p>{raket.description}</p>
                        <p>Budget: Php {raket.budget}</p>
                        <p>Posted by: {raket.user?.name} ({raket.user?.email})</p>
                        <span style={{ color: '#888', fontSize: '0.9em' }}>
                            Posted {raket.dateCreated ? formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true}) : ""}
                        </span>
                    </div>
                ))
                : filteredFeed.map((raketista) => (
                    <div key={raketista.uid} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
                        <strong>{raketista.name}</strong>
                        <p>Email: {raketista.email}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Home;