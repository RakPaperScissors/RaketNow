export async function fetchRakets() {
    const response = await fetch('http://localhost:3000/rakets');
    if (!response.ok) throw new Error('Failed to fetch rakets');
    return response.json();
}

// To open specific raket details
export async function getRaketById(id) {
    const response = await fetch(`http://localhost:3000/rakets/${id}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch raket.");
    }
    return response.json();
}

// applying to a raket
// export async function applyToRaket({ raketId, raketistaId, priceProposal, budget }, accessToken) {
//     const response = await fetch('http://localhost:3000/raket-application', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             raketId,
//             raketistaId,
//             priceProposal,
//             budget,
//         }),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to apply to raket.');
//     }
//     return response.json();
// }