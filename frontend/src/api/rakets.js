// fetch all rakets
export async function fetchRakets() {
  const response = await fetch('http://localhost:3000/rakets', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch rakets');
  return response.json();
}

// open specific raket details
export async function getRaketById(id) {
  const response = await fetch(`http://localhost:3000/rakets/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error("Failed to fetch raket.");
  return response.json();
}

// delete rakets
export async function deleteRaketById(raketId) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}`, {
    method: "DELETE",
    credentials: 'include',
  });

  if (!response.ok) throw new Error("Failed to delete raket");
  return true;
}

// cancel ongoing rakets
export async function cancelOngoingRaket(raketId) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}/cancel-ongoing`, {
    method: "PATCH",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to cancel raket");
  return response.json();
}

// cancel open rakets
export const cancelOpenRaket = async (raketId) => {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/cancel-open`, {
    method: 'PATCH',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to cancel open raket');
  return;
};

// fetch my rakets
export async function fetchMyRakets() {
  const res = await fetch("http://localhost:3000/rakets/myrakets", {
    method: "GET",
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error("Failed to fetch your rakets");
  }
  return res.json();
}

// update raket status (only clients can do this to their raket)
export async function updateRaketStatus(id, status) {
  const response = await fetch(`http://localhost:3000/rakets/${id}/status?status=${status}`, {
    method: "PATCH",
    credentials: 'include',
  });
  if (!response.ok) throw new Error("Failed to update raket status");
  return response.json();
}

// fetch rakets assigned to me
export async function fetchAssignedRakets() {
  const response = await fetch('http://localhost:3000/rakets/assigned-to-me', {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch assigned rakets');

  const data = await response.json();
  console.log('Fetched assigned rakets:', data);
  return data;
}

// fetching raket applications from the client side
export async function fetchRaketApplications() {
  const response = await fetch('http://localhost:3000/raket-application', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch raket applications');
  return response.json();
}

// fetch application based on raket for filtering
export async function fetchApplicationsForRaket(raketId) {
  const response = await fetch(`http://localhost:3000/raket-application/raket/${raketId}/applications`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}

// applying to a raket
export async function applyToRaket({ raketId, raketistaId, priceProposal }) {
  console.log("Sending:", { raketId, raketistaId, priceProposal });
  const response = await fetch('http://localhost:3000/raket-application', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raketId,
      raketistaId,
      priceProposal,
    }),
  });
  if (!response.ok) throw new Error('Failed to apply to raket.');
  return response.json();
}


// accepting or rejecting raket application
export async function acceptApplication(id) {
  const res = await fetch(`http://localhost:3000/raket-application/${id}/accept`, {
    method: 'PATCH',
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`(${res.status}) ${text || res.statusText}`);
  }
  return res.json();
}

export async function rejectApplication(id) {
  const res = await fetch(`http://localhost:3000/raket-application/${id}/reject`, {
    method: 'PATCH',
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`(${res.status}) ${text || res.statusText}`);
  }
  return res.json();
}

// request raket completion
export const requestCompletion = async (raketId) => {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/request-completion`, {
    method: "PATCH",
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to request completion");
  return res.json();
};

// cancel confirmation request
export const cancelCompletionRequest = async (raketId) => {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/cancel-completion`, {
    method: "PATCH",
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to cancel confirmation request");
  return res.json();
};

// client rejects completion request
export async function rejectCompletionRequest(raketId) {
  const res = await fetch(`http://localhost:3000/rakets/${raketId}/reject-completion`, {
    method: "PATCH",
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to reject completion request");
  return res.json();
}

// raketista withdraws from raket
export async function withdrawFromRaket(raketId) {
  const response = await fetch(`http://localhost:3000/rakets/${raketId}/withdraw`, {
    method: 'PATCH',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to withdraw');
  return await response.json();
}

// raketista withdraws application
export async function withdrawMyApplication(applicationId) {
  const res = await fetch(`http://localhost:3000/raket-application/${applicationId}/withdraw`, {
    method: 'PATCH',
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`(${res.status}) ${text || res.statusText}`);
  }

  return res.json();
}

export async function postRaket(data) {
  const res = await fetch('http://localhost:3000/rakets', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("Server responded with error:", error);
    throw new Error('Failed to post raket.');
  }

  return res.json();
}