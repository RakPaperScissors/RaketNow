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

// delete rakets
export async function deleteRaketById(raketId, token) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete raket");
  }

  return true;
}

// cancel ongoing rakets
export async function cancelRaket(raketId, accessToken) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to cancel raket");
  }
  return response.json();
}

// fetch my rakets
export async function fetchMyRakets(accessToken) {
  const response = await fetch('http://localhost:3000/rakets/myrakets', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch your rakets');
  }
  return response.json();
}

// update raket status (only clients can do this to their raket)
export async function updateRaketStatus(id, status, token) {
  const response = await fetch(`http://localhost:3000/rakets/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update raket status");
  return response.json();
}

// fetch rakets assigned to me
export async function fetchAssignedRakets(accessToken) {
  const response = await fetch('http://localhost:3000/rakets/assigned-to-me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch assigned rakets');
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
export async function acceptApplication(id, token) {
  const res = await fetch(`http://localhost:3000/raket-application/${id}/accept`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`(${res.status}) ${text || res.statusText}`);
  }
  return res.json();
}

export async function rejectApplication(id, token) {
  const res = await fetch(`http://localhost:3000/raket-application/${id}/reject`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`(${res.status}) ${text || res.statusText}`);
  }
  return res.json();
}

// for pending confirmation for raket completion
export const requestCompletion = async (raketId, token) => {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/request-completion`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to request completion");
  return res.json();
};

export const cancelCompletionRequest = async (raketId, token) => {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/cancel-completion-request`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to cancel confirmation request");
  return res.json();
};

// client rejects request confirmation (bro it's still ongoing)
export async function rejectCompletionRequest(raketId, token) {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/reject-completion-request`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to reject completion request");
  return res.json();
}

//withdrawing from the ongoing raket (raketista withdraws)
export async function withdrawFromRaket(raketId, accessToken) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}/withdraw`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error('Failed to withdraw');
  return await response.json();
}