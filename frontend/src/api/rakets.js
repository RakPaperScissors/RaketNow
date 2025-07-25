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

// fetching raket applications from the client side
export async function fetchRaketApplications(accessToken) {
  const response = await fetch('http://localhost:3000/raket-application', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch raket applications');
  return response.json();
}
// fetch application based on raket for filtering
export async function fetchApplicationsForRaket(raketId, accessToken) {
  const response = await fetch(`http://localhost:3000/raket-application/raket/${raketId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('Failed to fetch applications based on the raket');
  return response.json();
}


// applying to a raket
export async function applyToRaket({ raketId, raketistaId, priceProposal }, accessToken) {
    const response = await fetch('http://localhost:3000/raket-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            raketId,
            raketistaId,
            priceProposal,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to apply to raket.');
    }
    return response.json();
}


// accepting or rejecting raket application
export async function acceptApplication(id, accessToken) {
    const response = await fetch(`http://localhost:3000/raket-application/${id}/accept`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) throw new Error('Failed to accept application');
    return response.json();
}

export async function rejectApplication(id, accessToken) {
    const response = await fetch(`http://localhost:3000/raket-application/${id}/reject`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) throw new Error('Failed to reject application');
    return response.json();
}