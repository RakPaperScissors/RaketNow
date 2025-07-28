export async function fetchUsers() {
    const response = await fetch('http://localhost:3000/user');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
}

export async function fetchUsersByRole(role) {
    const response = await fetch(`http://localhost:3000/user?role=${role}`);
    if (!response.ok) throw new Error('Failed to fetch users by role');
    return response.json();
}

export async function fetchRaketistas() {
    const response = await fetch('http://localhost:3000/raketista');
    if (!response.ok) throw new Error('Failed to fetch raketistas');
    return response.json();
}